import { StarField } from "@/components/StarField"
import { ChevronDown, Linkedin, Users, LineChart, Clock, Lightbulb } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export default function Index() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Calculate blur based on scroll position
          // Reduced max blur from 20px to 8px for a more subtle effect
          const maxBlur = 8
          // Increased trigger height to make the effect develop more slowly
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          // Update last scroll position for next comparison
          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  // Intersection observer for visibility
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          // Once visible, no need to observe anymore
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          // Once visible, no need to observe anymore
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          // Once visible, no need to observe anymore
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          // Once visible, no need to observe anymore
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16 // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  // Scroll to about section
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Scroll to contact section
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        {/* Navigation links in top right corner */}
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <a
            href="https://linkedin.com/company/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Профиль в LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Контакты
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                Ваш личный кабинет{" "}
                <span role="img" aria-label="sparkles">
                  ✨
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Управляйте заказами, отслеживайте историю и контролируйте профиль в одном месте
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                >
                  Войти в кабинет
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                >
                  Регистрация
                </Button>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Перейти к разделу о нас"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
          <h2
            ref={headingRef}
            className={cn(
              "text-3xl font-bold text-white md:text-5xl transition-all duration-1000 ease-out mb-12 text-center",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Преимущества платформы
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Icon name="Users" className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-2">Удобный интерфейс</h3>
              <p className="text-gray-300">Интуитивно понятный дизайн личного кабинета для быстрого доступа ко всем функциям</p>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Icon name="LineChart" className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-2">Полная история действий</h3>
              <p className="text-gray-300">Отслеживайте все свои заказы, платежи и активность в удобном формате</p>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Icon name="Clock" className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-2">Доступ 24/7</h3>
              <p className="text-gray-300">Управляйте своим профилем и заказами в любое время из любого места</p>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Icon name="Lightbulb" className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-2">Безопасность данных</h3>
              <p className="text-gray-300">Надежная защита вашей личной информации и конфиденциальности</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "text-3xl font-bold text-gray-900 md:text-5xl mb-12 transition-all duration-1000 ease-out text-center",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Возможности кабинета
          </h2>

          <div
            ref={servicesContentRef}
            className={cn(
              "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-3 text-4xl">👤</div>
              <h3 className="mb-2 text-xl font-bold">Управление профилем</h3>
              <p className="text-gray-600">Редактируйте личные данные, настройки уведомлений и предпочтения в одном месте</p>
            </div>

            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-3 text-4xl">📦</div>
              <h3 className="mb-2 text-xl font-bold">Мои заказы</h3>
              <p className="text-gray-600">Отслеживайте статус текущих заказов, просматривайте детали и историю покупок</p>
            </div>

            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-3 text-4xl">💳</div>
              <h3 className="mb-2 text-xl font-bold">Платежи и счета</h3>
              <p className="text-gray-600">Управляйте способами оплаты, просматривайте счета и историю транзакций</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactSectionRef} className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-5xl">Остались вопросы?</h2>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-black py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 Личный кабинет. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
