import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go} />
					<Persik id='persik' go={go} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}
const app1= () => {
	const [activePanel, setPanel] = useState('main');
const [activeModalPanel, setModalPanel] = useState('gallery');
const [hasModal, showModal] = useState(false);
console.log(hasModal);

<>
<div>
  <AppRoot embedded noLegacyClasses scroll="global">
    <View activePanel={activePanel}>
      <Panel id="main">
        <PanelHeader>vkui embedded</PanelHeader>
        <Group>
          <Placeholder
            icon={<Icon56UsersOutline />}
            style={{ minHeight: '110vh' }}
            action={<Button size="m" onClick={() => showModal(true)}>Хочу модалку</Button>}
          >
            Это vkui-приложение в контентной зоне скроллится вместе с body.
          </Placeholder>
          <CellButton onClick={() => setPanel('deep-main')}>Второй экран</CellButton>
        </Group>
      </Panel>

      <Panel id="deep-main">
        <PanelHeader left={<PanelHeaderBack onClick={() => setPanel('main')} />}>
          Второй экран
        </PanelHeader>
        <Group>
          <Placeholder>Ничего интересного</Placeholder>
        </Group>
      </Panel>
    </View>
  </AppRoot>
</div>
{ hasModal && (
  <div style={{ position: 'fixed', boxSizing: 'border-box', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', padding: '30px' }}>
    <div style={{ height: '100%', borderRadius: '8px' }}>
      <AppRoot embedded scroll="contain" noLegacyClasses>
        <View activePanel={activeModalPanel}>
          <Panel id="gallery">
            <PanelHeader
              right={<PanelHeaderButton onClick={() => showModal(false)}><Icon24Dismiss/></PanelHeaderButton>}
            >Модалка</PanelHeader>
            <Group>
              <Placeholder
                icon={<Icon56FlipPortraitOutline />}
                style={{ minHeight: '100vh' }}
                action={<Button size="m" onClick={() => setModalPanel('secondary')}>Глубже</Button>}
              >
                Это другое приложение, и оно скроллится внутри модалки
              </Placeholder>
            </Group>
          </Panel>

          <Panel id="secondary">
            <PanelHeader left={<PanelHeaderBack onClick={() => setModalPanel('gallery')} />}>
              Вы спите
            </PanelHeader>
            <Group>
              <Placeholder icon={<Icon56GhostOutline />}>
                Тут мужики на снегоходах катаются
              </Placeholder>
            </Group>
          </Panel>
        </View>
      </AppRoot>
    </div>
  </div>
)}
</>
}
export default App;
