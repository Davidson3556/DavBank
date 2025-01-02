"use client";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";


const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with Appwrite & create plaid token

      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);

        setUser(newUser);
        toast.success("Account created successfully!");
        return;
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
        toast.success("Signed in successfully!");
        return;
      }
    } catch (error) {
      error instanceof Error
        ? toast.error(error.message)
        : toast.error("Submission error");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8 ">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1
            className="text-24 lg:text-24 font-semibold
            text-[#FFFFFF]"
          >
            {user
              ? "Link Account"
              : type === "sign-in"
                ? "Log In"
                : "Create an account"}
            <p className="text-16 font-normal text-[#F6E0FF] mt-5">
              {user
                ? "Link Account"
                : type === "sign-in"
                  ? "Welcome back! please enter your details"
                  : "Create an account to get started."}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label=""
                      placeholder="First name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label=""
                      placeholder="Last name"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="email"
                    label=""
                    placeholder="Email"
                  />
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label=""
                    placeholder="Enter your specific address"
                  />
                  <div className="flex gap-4">
                    
                  <FormField
    control={form.control}
    name="dateOfBirth"
    render={({ field }) => (
      <div className="form-item">
        <FormControl>
          <ReactDatePicker
            selected={field.value ? parseISO(field.value) : null}
            onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            className="input-class h-10"
            maxDate={new Date()} // Ensure dates are in the past
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100} // Show 100 years
          />
        </FormControl>
      </div>
    )}
  />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label=""
                      placeholder="SSN"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex w-full flex-col h-10">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <div className="form-item">
                            <FormControl>
                              <select
                                {...field}
                                className="inputauth-class h-10"
                              >
                                <option value="" disabled>
                                  Select a state
                                </option>
                                {US_STATES.map((city) => (
                                  <option key={city} value={city}
                                  className="bg-white text-btncolor">
                                    {city}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                          </div>
                        )}
                      />
                    </div>
                    
                  </div>


                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label=""
                      placeholder="Postal code"
                    />
                    <CustomInput
                      control={form.control}
                      name="state"
                      label=""
                      placeholder="City"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="password"
                    label=""
                    placeholder="Password"
                  />
                </>
              )}

              {/* password */}
              {type === "sign-in" && (
                <>
                  <CustomInput
                    control={form.control}
                    name="email"
                    label=""
                    placeholder="Enter your Email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label=""
                    placeholder="Enter your Password"
                  />
                </>
              )}
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Log In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-[#F6E0FF]">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
