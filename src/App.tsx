import { FC} from 'react';
import AppRoutes from './components/AppRoutes/AppRoutes';
import Spinner from './components/common/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const App: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <Spinner />
      <AppRoutes />
      {/* <div>{t('welcomeMessagee',{count:2})}</div> */}
    </div>
  );
};

export default App;
