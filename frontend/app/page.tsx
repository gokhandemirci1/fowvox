'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Zap, Shield, Users, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">FlowVox AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-primary-600 transition">Ana Sayfa</Link>
              <Link href="#services" className="text-gray-700 hover:text-primary-600 transition">Hizmetler</Link>
              <Link href="#about" className="text-gray-700 hover:text-primary-600 transition">Hakkımızda</Link>
              <Link href="/appointment" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Yapay Zeka ile
              <span className="text-primary-600 block mt-2">Geleceği Şekillendirin</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              FlowVox AI olarak, işletmenizi yapay zeka teknolojileri ile dönüştürüyoruz. 
              Modern çözümler, güvenilir danışmanlık.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointment"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                Randevu Al
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#services"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
              >
                Hizmetlerimiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Size özel yapay zeka çözümleri sunuyoruz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Danışmanlık',
                description: 'İşletmeniz için en uygun yapay zeka stratejilerini belirliyoruz ve uygulama planı hazırlıyoruz.',
              },
              {
                icon: Zap,
                title: 'Otomasyon Çözümleri',
                description: 'İş süreçlerinizi otomatikleştirerek verimliliği artırıyoruz ve maliyetleri düşürüyoruz.',
              },
              {
                icon: Shield,
                title: 'Güvenlik ve Uyumluluk',
                description: 'AI sistemlerinizin güvenliğini sağlıyoruz ve yasal uyumluluk gereksinimlerini karşılıyoruz.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Hakkımızda
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                FlowVox AI, yapay zeka teknolojilerinde öncü bir danışmanlık firmasıdır. 
                Müşterilerimize en son teknoloji çözümlerini sunarak, işletmelerinin 
                dijital dönüşümünde yanlarında yer alıyoruz.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Deneyimli ekibimiz ve kanıtlanmış metodolojimiz ile, her işletmeye 
                özel çözümler geliştiriyoruz.
              </p>
              <div className="space-y-4">
                {[
                  'Uzman AI Danışmanları',
                  'Özelleştirilmiş Çözümler',
                  '7/24 Destek',
                  'Kanıtlanmış Başarı Hikayeleri',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl p-8 text-white">
                <Users className="h-16 w-16 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Neden FlowVox AI?</h3>
                <ul className="space-y-3 text-lg">
                  <li>✓ 100+ Başarılı Proje</li>
                  <li>✓ Sektörde 5+ Yıl Deneyim</li>
                  <li>✓ %98 Müşteri Memnuniyeti</li>
                  <li>✓ Sürekli İnovasyon</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              İşletmenizi yapay zeka ile dönüştürmek için bugün randevu alın. 
              Uzman ekibimiz size özel çözümler sunmak için hazır.
            </p>
            <Link
              href="/appointment"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 mx-auto"
            >
              Ücretsiz Randevu Al
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold text-white">FlowVox AI</span>
              </div>
              <p className="text-gray-400">
                Yapay zeka ile işletmenizi dönüştürün.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link href="#home" className="hover:text-primary-400 transition">Ana Sayfa</Link></li>
                <li><Link href="#services" className="hover:text-primary-400 transition">Hizmetler</Link></li>
                <li><Link href="#about" className="hover:text-primary-400 transition">Hakkımızda</Link></li>
                <li><Link href="/appointment" className="hover:text-primary-400 transition">Randevu Al</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">İletişim</h4>
              <p className="text-gray-400">Email: info@flowvox.ai</p>
              <p className="text-gray-400">Tel: +90 (XXX) XXX XX XX</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FlowVox AI. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

