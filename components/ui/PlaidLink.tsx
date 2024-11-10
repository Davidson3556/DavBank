import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './button'
import { StyledString } from 'next/dist/build/swc';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const getLinkToken = async () => {
            // const data =  await createLinkToken(user);
            // setToken(data?.linkToken)
        }
        getLinkToken();
    }
    )

    const onSuccess = useCallback(async (public_token: 
        StyledString) => {
            // await exchangePublicToken({
            //     publicToken: public_token,
            // })

    }, [user])

    const config: PlaidLinkOptions ={
        token,
        onSuccess
    }

  return (
   <>
   {
    variant ==='primary' ?(
        <Button
        className="plaidlink-primary">
            Connect bank
        </Button>
    ): variant === 'ghost' ?(
        <Button>
            Connect Bank
        </Button>
    
    ):
    (
        <Button>
            Connect Bank
        </Button>
    )
   }
   </>
  )
}

export default PlaidLink
