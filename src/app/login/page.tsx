'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  isValidElement,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomButton from '@/Components/Shared/CustomButton';
import CustomInput from '@/Components/Shared/CustomInput';
import { useAuth } from '@/hooks/auth.hook';
import Link from 'next/link';
import { LoginUser, RegisterUser } from '@/type';

// Utility function for concatenating class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Context and Hooks
interface TabContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  wobbly: boolean;
  hover: boolean;
  defaultValue: string;
  prevIndex: number;
  setPrevIndex: (value: number) => void;
  tabsOrder: string[];
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

// TabsProvider Component
interface TabsProviderProps {
  children: ReactNode;
  defaultValue: string;
  wobbly?: boolean;
  hover?: boolean;
}

const TabsProvider: React.FC<TabsProviderProps> = ({
  children,
  defaultValue,
  wobbly = true,
  hover = false,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [prevIndex, setPrevIndex] = useState(0);
  const [tabsOrder, setTabsOrder] = useState<string[]>([]);

  useEffect(() => {
    const order: string[] = [];
    React.Children.map(children, (child) => {
      if (isValidElement(child) && child.type === TabsContent) {
        order.push(child.props.value);
      }
    });
    setTabsOrder(order);
  }, [children]);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        wobbly,
        hover,
        defaultValue,
        setPrevIndex,
        prevIndex,
        tabsOrder,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

// TabsBtn Component
interface TabsBtnProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const TabsBtn: React.FC<TabsBtnProps> = ({ children, className, value }) => {
  const {
    activeTab,
    setPrevIndex,
    setActiveTab,
    defaultValue,
    hover,
    wobbly,
    tabsOrder,
  } = useTabs();

  const handleClick = () => {
    setPrevIndex(tabsOrder.indexOf(activeTab));
    setActiveTab(value);
  };

  return (
    <motion.div
      className={cn(
        'cursor-pointer sm:p-2 p-1 sm:px-4 px-2 rounded-md relative',
        className || ''
      )}
      onFocus={() => {
        hover && handleClick();
      }}
      onMouseEnter={() => {
        hover && handleClick();
      }}
      onClick={handleClick}
    >
      {children}

      {activeTab === value && (
        <AnimatePresence mode="wait">
          <motion.div
            transition={{
              layout: {
                duration: 0.2,
                ease: 'easeInOut',
                delay: 0.2,
              },
            }}
            layoutId={defaultValue}
            className="absolute w-full h-full left-0 top-0 dark:bg-base-dark bg-background-dark rounded-md z-[1]"
          />
        </AnimatePresence>
      )}

      {wobbly && activeTab === value && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              transition={{
                layout: {
                  duration: 0.4,
                  ease: 'easeInOut',
                  delay: 0.04,
                },
              }}
              layoutId={defaultValue}
              className="absolute w-full h-full left-0 top-0 dark:bg-base-dark bg-background-dark rounded-md z-[1] tab-shadow"
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              transition={{
                layout: {
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: 0.2,
                },
              }}
              layoutId={`${defaultValue}b`}
              className="absolute w-full h-full left-0 top-0 dark:bg-base-dark bg-background-dark rounded-md z-[1] tab-shadow"
            />
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

// TabsContent Component
interface TabsContentProps {
  children: ReactNode;
  className?: string;
  value: string;
  yValue?: boolean;
}

const TabsContent: React.FC<TabsContentProps> = ({
  children,
  className,
  value,
  yValue,
}) => {
  const { activeTab, tabsOrder, prevIndex } = useTabs();
  const isForward = tabsOrder.indexOf(activeTab) > prevIndex;

  return (
    <AnimatePresence mode="popLayout">
      {activeTab === value && (
        <motion.div
          initial={{ opacity: 0, y: yValue ? (isForward ? 10 : -10) : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: yValue ? (isForward ? -50 : 50) : 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className={cn('bg-background-dark px-4  relative', className || '')}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
const Login: React.FC = () => {
  const [registerFormData, setRegisterFormData] = useState<RegisterUser>({
    name: '',
    email: '',
    password: '',
  });
  const [loginFormData, setLoginFormData] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const { handleRegister, isRegisterLoading, handleLogin, isLoginLoading } =
    useAuth();

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(registerFormData);
  };

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(loginFormData);
  };

  return (
    <TabsProvider defaultValue={'login'} wobbly={true}>
      <div className="flex justify-center pt-2 bg-background-dark">
        <div className="flex items-center w-fit dark:bg-[#1a1c20] bg-gray-200 p-1 dark:text-white text-black rounded-md border">
          <TabsBtn value="login">
            <span className="relative z-[2] uppercase">Login</span>
          </TabsBtn>
          <TabsBtn value="register">
            <span className="relative z-[2] uppercase">Register</span>
          </TabsBtn>
        </div>
      </div>

      <TabsContent value="login">
        <div className="flex justify-center items-center min-h-[calc(100vh-48px)]">
          <form
            onSubmit={handleLoginUser}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent pb-5">
              Login
            </h1>

            <CustomInput
              type="email"
              placeholder="Email"
              value={loginFormData.email}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, email: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, password: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <div className="flex justify-end">
              <Link
                href={'/forget-password'}
                className="underline text-sm text-secondary-dark hover:text-link-hover "
              >
                Forget Password
              </Link>
            </div>
            <CustomButton
              type="submit"
              text={isLoginLoading ? 'Loginnnnnnn...' : 'Login'}
              disabled={isLoginLoading}
              className="bg-button-bg hover:bg-button-hover text-button-text "
            />
           
          </form>
        </div>
      </TabsContent>
      <TabsContent value="register">
        <div className="flex justify-center items-center min-h-[calc(100vh-48px)]">
          <form
            onSubmit={handleRegisterUser}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent pb-5">
              Register
            </h1>

            <CustomInput
              type="text"
              placeholder="Name"
              value={registerFormData.name}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  name: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <CustomInput
              type="email"
              placeholder="Email"
              value={registerFormData.email}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  email: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              value={registerFormData.password}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  password: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md"
            />

            <CustomButton
              type="submit"
              text={isRegisterLoading ? 'Registering...' : 'Register'}
              disabled={isRegisterLoading}
              className="bg-button-bg hover:bg-button-hover text-button-text "
            />
           
          </form>
        </div>
      </TabsContent>
    </TabsProvider>
  );
};

export default Login;
