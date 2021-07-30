import {GlueContext} from "@glue42/react-hooks";
import {useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {focusWorkspace} from "./utils";

const HistoryListener = ()=> {
  const glue = useContext(GlueContext)
  const location = useLocation();

  useEffect( () => {
    const pathname = location.pathname.split('/')[1]
    focusWorkspace(glue, pathname)
  }, [glue, location]);

  return (<></>)
}

export default  HistoryListener