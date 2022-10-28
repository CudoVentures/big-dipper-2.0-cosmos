import {
  useEffect, useState,
} from 'react';
import Form from 'react-jsonschema-form';
import {
  connectWasmQueryClient, connectWasmSigningClient,
  getAccount, getQueryFunc, getExecuteFunc,
} from '@utils/smart_contract_interaction';
import {
  SigningCosmWasmClient, CosmWasmClient,
} from 'cudosjs';

interface ISmartContractInteractionProps {
    rpcUrl: string;
    chainID: string,
    gasPrice:string,
    address: string,
    querySchema?: string,
    executeSchema?: string,
}

type SmartContractInteractionDetails = {
    account: any;
    querySchemaObj: any;
    executeSchemaObj: any;
    queryClient: CosmWasmClient;
    executeClient: SigningCosmWasmClient;
}

const initialState: SmartContractInteractionDetails = {
  account: '',
  querySchemaObj: null,
  executeSchemaObj: null,
  queryClient: null,
  executeClient: null,
};

const SmartContractInteraction = (props: ISmartContractInteractionProps) => {
  const [state, setState] = useState<SmartContractInteractionDetails>(initialState);

  useEffect(() => {
    const newState: any = {};

    if (props.querySchema) {
      const querySchemaObj = props.querySchema;

      AddMissingTitles(querySchemaObj, '');

      newState.querySchemaObj = querySchemaObj;

      connectWasmQueryClient(props.rpcUrl).then((client) => {
        setState((prevState) => ({
          ...prevState,
          queryClient: client,
        }));
      }).catch((err) => {
        console.error(`connecting query client failed ${err}`);
      });
    }

    if (props.executeSchema) {
      const executeSchemaObj = props.executeSchema;

      AddMissingTitles(executeSchemaObj, '');

      newState.executeSchemaObj = executeSchemaObj;

      getAccount(props.chainID).then((acc) => {
        setState((prevState) => ({
          ...prevState,
          account: acc,
        }));
      }).catch((err) => {
        console.error(`getting account failed ${err}`);
      });

      connectWasmSigningClient(props.chainID, props.rpcUrl, props.gasPrice).then((client) => {
        setState((prevState) => ({
          ...prevState,
          executeClient: client,
        }));
      }).catch((err) => {
        console.error(`connecting execute client failed ${err}`);
      });
    }

    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  const onSubmitQuery = (event: any) => {
    const formData = getFormData(event, 0);
    const queryFunc = getQueryFunc(state.queryClient, props.address);
    queryFunc(formData).then((res) => {
      console.log(res);
    });
  };

  const onSubmitExecute = async (event: any) => {
    const formData = getFormData(event, 1);
    const executeFunc = getExecuteFunc(state.executeClient, props.address);
    executeFunc(state.account.address, formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {
                state.querySchemaObj
                && <h2>Query:</h2>
                && <Form schema={state.querySchemaObj} onSubmit={onSubmitQuery} noValidate />
            }
      {
                state.executeSchemaObj
                && <h2>Execute:</h2>
                && <Form schema={state.executeSchemaObj} onSubmit={onSubmitExecute} noValidate />
            }
    </>
  );
};

SmartContractInteraction.defaultProps = {
  querySchema: '',
  executeSchema: '',
};

const getFormData = (event: any, menuIndex: number): string => {
  const menu = document.querySelectorAll('select[id=\'root_anyof_select\']')[menuIndex] as any;
  const selectedOption = menu.selectedOptions[0].text as string;

  if (!(selectedOption in event.formData)) {
    throw new Error('Invalid form data');
  }

  // Not using event.formData directly becasue it may contain unnecessary properties

  return JSON.stringify({ [selectedOption]: event.formData[selectedOption] });
};

const AddMissingTitles = (obj: any, parentProp: string) => {
  if (typeof obj !== 'object') {
    return;
  }

  const keys = Object.keys(obj);

  for (const key of keys) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    let nextKey = key;

    if (Number.isInteger(key)) {
      nextKey = parentProp;
    }

    AddMissingTitles(obj[key], nextKey);

    if (['oneOf', 'anyOf'].includes(parentProp)) {
      AddMissingTitle(obj[nextKey]);
    }
  }
};

const AddMissingTitle = (obj: any) => {
  if ('title' in obj) {
    return;
  }

  if ('required' in obj && obj.required.length == 1) {
    obj.title = obj.required[0];
    return;
  }

  if ('type' in obj && obj.type === 'null') {
    obj.title = 'None';
    return;
  }

  if ('$ref' in obj) {
    const parts = obj.$ref.split('/');
    obj.title = parts[parts.length - 1];
  }
};

export default SmartContractInteraction;
