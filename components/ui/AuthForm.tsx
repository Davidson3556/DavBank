'use client';
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"




import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ITEMS } from '@/constants';
import CustomInput from './CustomInput';
import {authFormSchema} from '@/lib/utils'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const Schema = z.object({
    email: z.string().email(),
  })
   



const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const formSchema = authFormSchema (type); 
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            email: "",
            password: "",
          },
        })
       
        // 2. Define a submit handler.
        const onSubmit= async (data: z.infer<typeof formSchema>) => {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          setIsLoading(true);

          try{
            //  sign up with appwrite & CREATE PLAID TOKEN
            if (type ==='sign-up'){
             const newUser = await signUp(data);
             setUser(newUser);
            }
            if (type==='sign-in'){
              const response =await signIn({
                email:data.email,
                password: data.password,
              })
              if(response) router.push('/')
              
            }
          } catch (error) {
            console.log(error);
          }finally {
            setIsLoading(false);
          }
         
        }


  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8 ">
        
        <div className="flex flex-col gap-1 md:gap-3">
            <h1 className='text-24 lg:text-24 font-semibold
            text-[#FFFFFF]'>
              
                {user
                ?'Link Account'
            :type==='sign-in'
            ?'Log In'
            :'Create an account'
            }
              <p className='text-16 font-normal text-[#F6E0FF] mt-5'>

              {user
              ?'Link Account'
              :type === 'sign-in' 
              ? 'Please enter your details to log in.' 
              : 'Create an account to get started.'}
                    
              </p>
            </h1>

        </div>
        </header>   
            {user ?(
                <div className="flex flex-col gap-4">
                    {/* plaidlink */}
                    <PlaidLink user={user} variant="primary"/>
                </div>
            ):(
                <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                          <>
                          <div className="flex gap-4">
                            <CustomInput
                              control={form.control} name="firstName" label="" 
                              placeholder="First name"
                            />
                              <CustomInput
                                control={form.control} name="lastName" label="" 
                                placeholder="Last name"
                              />
                          </div>
                           
                    <CustomInput
                           control={form.control} name="email" label="" 
                           placeholder="Email"
                    />
                    <CustomInput
                           control={form.control} name="phoneNumber" label=""
                           placeholder="Phonenumber"
                    />
                    <CustomInput
                           control={form.control} name="password" label="" 
                           placeholder="Password"
                    />
                    <CustomInput
                           control={form.control} name="confirmPassword" label="" 
                           placeholder="Confirm Password"
                    />
                          </>
                        )
                        }

                    {/* password */}
                    {type === 'sign-in' && (
                      <>
                    <CustomInput
                      control={form.control} name="email" label="" 
                      placeholder="Enter your Email"
                    />
                    <CustomInput
                      control={form.control} name="password" label=""
                       placeholder="Enter your Password"
                       
                       
                    />
                    </>
                    )}
                    <div className="flex flex-col gap-4">
                       <Button type="submit" 
                    disabled={isLoading}
                    className='form-btn'>
                      {isLoading?(
                        <>
                        <Loader2 size={20}
                        className="animate-spin"
                        /> &nbsp;
                        Loading...
                        </>
                      ) :type === 'sign-in'
                        ?'Log In': 'Create Account'}
                      </Button>
                    </div>
                   
                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                  <p className="text-14 font-normal text-[#F6E0FF]">
                    {type=== 'sign-in'
                    ?"Don't have an account?"
                    :"Already have an account"}
                  </p>
                  <Link href={type ==='sign-in'? '/sign-up':'/sign-in'}
                  className='form-link'>
                    {type === 'sign-in' ? 'Sign up':'Sign in'}
                  </Link>

                </footer>
                </>
            )}
    </section>
  )
}

export default AuthForm
