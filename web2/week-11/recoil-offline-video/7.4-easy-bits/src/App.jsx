
import { RecoilRoot, useRecoilValue } from 'recoil'
import './App.css'
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationSelector } from './atoms'

function App() {
return (
  <RecoilRoot>
    <MainApp />
  </RecoilRoot>
)
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messageCount = useRecoilValue(messagingAtom);
  const notificationsCount = useRecoilValue(notificationsAtom)
  const totalNotificationsCount = useRecoilValue(totalNotificationSelector)
  return (
    <div>
      <button>My Home</button>
      <button>My Networks ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notifications ({notificationsCount})</button>
      <button>Me ({totalNotificationsCount})</button>
    </div>
  )
}


export default App
