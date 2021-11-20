import { Auth, Typography, Button } from '@supabase/ui'
import { supabase }  from '../utils/supabaseClient'
import router, {useRouter} from 'next/router'

const Container = (props) => {
  const { user } = Auth.useUser()
  if (user)
    router.push('/');
  return props.children
}

export default function AuthBasic() {
  return (
    <div className='flex items-center justify-center h-screen align-center bg-black-50'>
      <div className=' max-w-7xl'>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Container supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Container>
        </Auth.UserContextProvider>
      </div>
    </div>
  )
}
