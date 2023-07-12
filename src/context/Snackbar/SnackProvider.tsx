import { createContext, FC, PropsWithChildren, useState } from "react";
import Snackbar from "../../Components/Snackbar";

interface SnackType {
  response: ResponseResult;
  onResponse: (res: ResponseResult) => void;
}

export const context = createContext<SnackType>({
  response: { message: "", status: 0 },
  onResponse: (res: ResponseResult) => {},
});

const SnackProvider: FC<PropsWithChildren> = ({ children }) => {
  const [response, setResponse] = useState<ResponseResult>({
    message: "",
    status: 0,
  });
  const onResponse = (res: ResponseResult) => {
    setResponse(res);
  };
  return (
    <context.Provider value={{ response: response, onResponse: onResponse }}>
      {children}
      <Snackbar
        response={response}
        onClose={() =>
          onResponse({
            message: "",
            status: 0,
          })
        }
      />
    </context.Provider>
  );
};

export default SnackProvider;
