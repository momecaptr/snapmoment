import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { Button } from '../components/button/Button';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
export default function Home() {
  return (
    <main>
      <h1 style={{ fontFamily: 'Roboto', color: 'green' }}>DEVELOPMENT</h1>
      <Button>123</Button>
      <Input label={'123'} placeholder={'123'} />
      <Typography as={'h1'} variant={'link2'}>
        sdkjfks
      </Typography>
    </main>
  );
}
