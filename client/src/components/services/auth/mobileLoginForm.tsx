'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { login, loginWithGoogle } from "@/app/reducers/AuthReducers"
import { AppDispatch, RootState } from "@/app/store"
import { useGoogleLogin } from "@react-oauth/google"
import { Link, useNavigate } from "react-router-dom"
import { Form, Field } from "react-final-form"

interface FormValues {
  email: string
  password: string
  rememberMe: boolean
}

export function MobileLoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const onSubmit = async (values: FormValues) => {
    const result = await dispatch(
      login({ email: values.email, password: values.password })
    ).unwrap()
    if (result.message === "Connexion réussie") {
      navigate("/map")
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const result = await dispatch(
        loginWithGoogle(tokenResponse.access_token)
      ).unwrap()
      if (result.message === "Connexion réussie") {
        navigate("/map")
      }
    },
    onError: (errorResponse) => console.error(errorResponse),
  })

  const spacerVariants = {
    login: { height: 0 },
    register: { height: 0 }, // Ajustez cette valeur selon vos besoins
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-xs">
      </div>

      {/* Header */}
      <div className="flex-1 p-6 flex flex-col justify-end">
        <Button variant="ghost" className="self-start p-0 mb-4">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold mb-2">Go ahead and set up your account</h1>
        <p className="text-sm text-gray-400">Sign in-up to enjoy the best managing experience</p>
      </div>

      {/* Login Form */}
      <div className="flex-[2] bg-white rounded-t-3xl p-6">
        <div className="flex mb-6 relative">
          <motion.div
            className="absolute top-0 bottom-0 w-1/2 bg-gray-100 rounded-full"
            initial={false}
            animate={{
              x: activeTab === "login" ? "0%" : "100%"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <Button
            variant="ghost"
            className={`flex-1 relative z-10 py-2 ${activeTab === "login" ? "text-black font-semibold" : "text-gray-400"}`}
            onClick={() => setActiveTab("login")}
          >
            Connexion
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 relative z-10 py-2 ${activeTab === "register" ? "text-black font-semibold" : "text-gray-400"}`}
            onClick={() => setActiveTab("register")}
          >
            Inscription
          </Button>
        </div>
        <Form<FormValues>
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field name="email">
                {({ input, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-600">Adresse e-mail</Label>
                    <Input {...input} id="email" placeholder="micahmad@potarastudio.com" type="email" className="bg-gray-100 border-0 text-black" />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-600">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        {...input}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={activeTab === "login" ? "mic4hmad#" : "Choisissez un mot de passe"}
                        className="bg-gray-100 border-0 pr-10 text-black"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <motion.div
                    key="login-extras"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded border-gray-300" />
                      <label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</label>
                      <Link to="/forgot-password" className="text-sm text-green-600 ml-auto">Mot de passe oublié ?</Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-spacer"
                    variants={spacerVariants}
                    initial="login"
                    animate={activeTab}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : (activeTab === "login" ? "Se connecter" : "S'inscrire")}
              </Button>
            </form>
          )}
        />
        <div className="mt-6 text-center text-sm">
          <p className="text-black mb-2">Ou connectez-vous avec</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center justify-center flex-1" onClick={() => googleLogin()}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-black">Google</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center flex-1">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span className="text-black">Facebook</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
