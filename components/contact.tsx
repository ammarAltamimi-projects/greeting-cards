"use client"
import Lottie from "lottie-react";
import mailAnimation from '../public/lottie/mail.json'
import { motion } from "framer-motion"
import { IoMdMail } from "react-icons/io";
import { useRef, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useTranslations } from 'next-intl';
import {
    Input,Button
} from "@heroui/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const MailIcon = (props:any) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
          fill="currentColor"
        />
      </svg>
    );
};

export const Contact = () => {
  const modal = useRef();
  const [state, handleSubmit] = useForm("xjkbgkyr");
  const t = useTranslations('Contact');
  const { theme } = useTheme(); 

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    if (!email) {
      toast.error(t('emailRequired') || 'Please enter your email address');
      return;
    }

    handleSubmit(e);
  };

  useEffect(() => {
    if (state?.succeeded) {
      toast.success(t('successMessage') || 'Thank you for subscribing!');
    }
  }, [state, t]);

  return (
    <div id="content" className="   mt-8">
      <div className="container mx-auto px-10  pt-10 text-white">
        <div className="main-heading text-center mb-8">
          <motion.h2 initial={{ opacity: 0, y: -70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl flex justify-center text-[#50545d]  lg:gap-x-2">
            <IoMdMail />
            <span>{t('newsletterTitle')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="mt-4 text-[#50545d]  text-2xl">
            {t('newsletterSubtitle')}
          </motion.p>
        </div>
        
        <div className="content flex flex-col md:flex-row gap-8 items-center">
          <form className="w-full lg:w-1/2 relative space-y-4" onSubmit={handleFormSubmit}>
            <div className="relative">
              <Input
                id="email"
                name="email"
                labelPlacement="outside"
                placeholder={t('emailPlaceholder')}
                startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                type="email"
                className="w-full backdrop-blur-sm bg-white/5 border border-gray-700 focus:border-[#ef3735] dark:focus:border-blue-400"
              />
              <ValidationError 
                prefix="Email" 
                field="email" 
                errors={state.errors}
                className="text-red-500 text-sm mt-1" 
              />
            </div>
            
            {/* Hidden message field that will automatically send the subscription message */}
            <input 
              type="hidden" 
              name="message" 
              value="I need to subscribe to your news paper"
            />
            
            <Button
              color={theme === "dark" ? "primary" : "danger"}
              type="submit"
              value="Send Message"
              className="w-full py-6 bg-gradient-to-r from-[#ef3735] to-[#ff5c59] dark:from-blue-600 dark:to-blue-400 shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={state.submitting}
            >
              {state.submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('subscribing') || 'Subscribing...'}</span>
                </div>
              ) : t('subscribeNow') || 'Subscribe Now'}
            </Button>
          </form>
          <div className="info w-full lg:w-1/2 flex justify-center items-center">
            <Lottie className="w-[400px]" animationData={mailAnimation} />
          </div>
        </div>
      </div>
    </div>
  );
};