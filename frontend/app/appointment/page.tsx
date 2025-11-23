'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone, User, Building, MessageSquare, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

interface AppointmentForm {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  message?: string
  preferred_date?: string
  preferred_time?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function AppointmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentForm>()

  const onSubmit = async (data: AppointmentForm) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await axios.post(`${API_URL}/api/appointments`, data)
      
      if (response.status === 200) {
        setSubmitStatus('success')
        setSubmitMessage('Randevu talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
        reset()
      }
    } catch (error: any) {
      setSubmitStatus('error')
      setSubmitMessage(
        error.response?.data?.detail || 
        'Randevu talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">FlowVox AI</span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Randevu Talebi
            </h1>
            <p className="text-xl text-gray-600">
              Size özel yapay zeka çözümleri için randevu alın
            </p>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                submitStatus === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus === 'success' ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <XCircle className="h-6 w-6" />
              )}
              <p>{submitMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Ad soyad gereklidir' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Adınız ve soyadınız"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'E-posta gereklidir',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçerli bir e-posta adresi giriniz',
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-2" />
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone', { required: 'Telefon numarası gereklidir' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="05XX XXX XX XX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="inline h-4 w-4 mr-2" />
                Şirket (Opsiyonel)
              </label>
              <input
                type="text"
                id="company"
                {...register('company')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Şirket adı"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                Hizmet Türü *
              </label>
              <select
                id="service"
                {...register('service', { required: 'Hizmet türü seçiniz' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Hizmet seçiniz</option>
                <option value="ai-danismanlik">AI Danışmanlık</option>
                <option value="otomasyon">Otomasyon Çözümleri</option>
                <option value="guvenlik">Güvenlik ve Uyumluluk</option>
                <option value="ozel-cozum">Özel Çözüm Geliştirme</option>
                <option value="diger">Diğer</option>
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label htmlFor="preferred_date" className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                Tercih Edilen Tarih (Opsiyonel)
              </label>
              <input
                type="date"
                id="preferred_date"
                {...register('preferred_date')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferred_time" className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-2" />
                Tercih Edilen Saat (Opsiyonel)
              </label>
              <input
                type="time"
                id="preferred_time"
                {...register('preferred_time')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Mesaj (Opsiyonel)
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Projeniz hakkında detaylı bilgi verebilirsiniz..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Randevu Talebi Gönder
                    <CheckCircle className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Randevu talebiniz gönderildikten sonra, en kısa sürede size e-posta veya telefon ile dönüş yapacağız.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

