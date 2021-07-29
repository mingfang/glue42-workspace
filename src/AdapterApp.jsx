import {GlueProvider} from '@glue42/react-hooks';
import GlueWeb from '@glue42/web';

const settings = {
  webPlatform: {
    factory: GlueWeb
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(props) {
  const url = props.location.pathname.split('/adapter/')[1]
  console.log('adapter url', url)
  return (
    <GlueProvider settings={settings}>
      <iframe title="iframe"
              src={url}
              scrolling="yes"
              style={{
                width: '1px',
                minHeight: '100vh',
                minWidth: '100%',
                overflow: 'hidden',
                border: '0px'
              }}/>
    </GlueProvider>
  );
}
