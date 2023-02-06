import PageError from '../../components/PageError/pageError';
import style from './errorPage.module.scss'

interface Props {
  code: number
}

function ErrorPage({code}: Props) {
  return ( 
    <main className={style.container}>
      <PageError code={code} />
    </main>
   );
}

export default ErrorPage;
