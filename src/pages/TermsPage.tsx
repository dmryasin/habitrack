import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { getTranslation } from '../utils/i18n';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const content = {
    tr: {
      title: 'Kullanım Koşulları',
      lastUpdated: 'Son Güncelleme: 20 Ekim 2025',
      intro: {
        title: 'Kullanım Koşullarını Kabul Ediyorsunuz',
        description: 'Alışkanlık Takipçisi uygulamasını kullanarak, aşağıdaki kullanım koşullarını kabul etmiş olursunuz.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Hizmet Kullanımı',
          items: [
            'Uygulamayı kişisel ve ticari olmayan amaçlarla kullanabilirsiniz',
            'Her cihazda yalnızca bir hesap oluşturabilirsiniz',
            'Uygulamayı yasalara uygun şekilde kullanmakla yükümlüsünüz',
            'Uygulamanın kaynak kodunu tersine mühendislik yaparak inceleyemezsiniz'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Yasaklanan Kullanımlar',
          items: [
            'Uygulamayı zararlı yazılım veya virüs yaymak için kullanamazsınız',
            'Diğer kullanıcıların deneyimini olumsuz etkileyemezsiniz',
            'Uygulamanın güvenlik sistemlerini aşmaya çalışamazsınız',
            'Sahte hesap oluşturarak sistemi manipüle edemezsiniz'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Sorumluluk Reddi',
          items: [
            'Uygulama "olduğu gibi" sunulmaktadır',
            'Veri kaybından sorumlu değiliz (düzenli yedekleme önerilir)',
            'Uygulamanın kesintisiz çalışacağını garanti etmiyoruz',
            'Üçüncü taraf hizmetlerden kaynaklanan sorunlardan sorumlu değiliz'
          ]
        }
      ],
      premium: {
        title: 'Premium Üyelik',
        description: 'Premium üyelik satın alırken aşağıdakileri kabul edersiniz:',
        items: [
          'Ödeme işlemleri güvenli ödeme sağlayıcıları aracılığıyla yapılır',
          'Premium üyelik otomatik olarak yenilenmez',
          'İade politikamız: İlk 7 gün içinde tam iade hakkınız vardır',
          'Premium özelliklere erişim, ödeme sonrası anında aktif olur'
        ]
      },
      changes: {
        title: 'Değişiklikler',
        description: 'Bu kullanım koşullarını istediğimiz zaman değiştirme hakkını saklı tutarız. Önemli değişiklikler için kullanıcılarımızı bilgilendireceğiz.'
      },
      contact: {
        title: 'İletişim',
        description: 'Kullanım koşulları hakkında sorularınız için:'
      }
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: October 20, 2025',
      intro: {
        title: 'You Accept These Terms',
        description: 'By using the Habit Tracker application, you agree to the following terms of service.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Service Usage',
          items: [
            'You may use the app for personal and non-commercial purposes',
            'You can only create one account per device',
            'You are obligated to use the app in compliance with laws',
            'You may not reverse engineer the app\'s source code'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Prohibited Uses',
          items: [
            'You may not use the app to spread malware or viruses',
            'You may not negatively affect other users\' experience',
            'You may not attempt to bypass the app\'s security systems',
            'You may not manipulate the system by creating fake accounts'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Disclaimer',
          items: [
            'The app is provided "as is"',
            'We are not responsible for data loss (regular backups recommended)',
            'We do not guarantee uninterrupted operation',
            'We are not responsible for issues from third-party services'
          ]
        }
      ],
      premium: {
        title: 'Premium Membership',
        description: 'When purchasing premium membership, you agree to:',
        items: [
          'Payments are processed through secure payment providers',
          'Premium membership does not auto-renew',
          'Refund policy: Full refund within the first 7 days',
          'Premium features are activated immediately after payment'
        ]
      },
      changes: {
        title: 'Changes',
        description: 'We reserve the right to modify these terms at any time. We will notify users of significant changes.'
      },
      contact: {
        title: 'Contact',
        description: 'For questions about these terms:'
      }
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última Actualización: 20 de octubre de 2025',
      intro: {
        title: 'Aceptas Estos Términos',
        description: 'Al usar la aplicación Rastreador de Hábitos, aceptas los siguientes términos de servicio.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Uso del Servicio',
          items: [
            'Puedes usar la app para fines personales y no comerciales',
            'Solo puedes crear una cuenta por dispositivo',
            'Estás obligado a usar la app cumpliendo las leyes',
            'No puedes hacer ingeniería inversa del código fuente'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Usos Prohibidos',
          items: [
            'No puedes usar la app para propagar malware o virus',
            'No puedes afectar negativamente la experiencia de otros usuarios',
            'No puedes intentar eludir los sistemas de seguridad',
            'No puedes manipular el sistema creando cuentas falsas'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Descargo de Responsabilidad',
          items: [
            'La app se proporciona "tal cual"',
            'No somos responsables de la pérdida de datos',
            'No garantizamos operación ininterrumpida',
            'No somos responsables de problemas de servicios de terceros'
          ]
        }
      ],
      premium: {
        title: 'Membresía Premium',
        description: 'Al comprar membresía premium, aceptas:',
        items: [
          'Los pagos se procesan a través de proveedores seguros',
          'La membresía premium no se renueva automáticamente',
          'Política de reembolso: Reembolso completo en los primeros 7 días',
          'Las funciones premium se activan inmediatamente después del pago'
        ]
      },
      changes: {
        title: 'Cambios',
        description: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios de cambios significativos.'
      },
      contact: {
        title: 'Contacto',
        description: 'Para preguntas sobre estos términos:'
      }
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Dernière Mise à Jour: 20 octobre 2025',
      intro: {
        title: 'Vous Acceptez Ces Conditions',
        description: 'En utilisant l\'application Suivi des Habitudes, vous acceptez les conditions d\'utilisation suivantes.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Utilisation du Service',
          items: [
            'Vous pouvez utiliser l\'app à des fins personnelles et non commerciales',
            'Vous ne pouvez créer qu\'un seul compte par appareil',
            'Vous êtes obligé d\'utiliser l\'app conformément aux lois',
            'Vous ne pouvez pas faire d\'ingénierie inverse du code source'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Utilisations Interdites',
          items: [
            'Vous ne pouvez pas utiliser l\'app pour propager des malwares ou virus',
            'Vous ne pouvez pas affecter négativement l\'expérience des autres',
            'Vous ne pouvez pas tenter de contourner les systèmes de sécurité',
            'Vous ne pouvez pas manipuler le système avec de faux comptes'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Déni de Responsabilité',
          items: [
            'L\'app est fournie "telle quelle"',
            'Nous ne sommes pas responsables de la perte de données',
            'Nous ne garantissons pas un fonctionnement ininterrompu',
            'Nous ne sommes pas responsables des problèmes de services tiers'
          ]
        }
      ],
      premium: {
        title: 'Adhésion Premium',
        description: 'En achetant l\'adhésion premium, vous acceptez:',
        items: [
          'Les paiements sont traités via des fournisseurs sécurisés',
          'L\'adhésion premium ne se renouvelle pas automatiquement',
          'Politique de remboursement: Remboursement complet dans les 7 premiers jours',
          'Les fonctionnalités premium sont activées immédiatement après paiement'
        ]
      },
      changes: {
        title: 'Changements',
        description: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Nous informerons les utilisateurs des changements importants.'
      },
      contact: {
        title: 'Contact',
        description: 'Pour des questions sur ces conditions:'
      }
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Letzte Aktualisierung: 20. Oktober 2025',
      intro: {
        title: 'Sie Akzeptieren Diese Bedingungen',
        description: 'Durch die Nutzung der Gewohnheits-Tracker-App stimmen Sie den folgenden Nutzungsbedingungen zu.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Nutzung des Dienstes',
          items: [
            'Sie dürfen die App für persönliche, nicht-kommerzielle Zwecke nutzen',
            'Sie können nur ein Konto pro Gerät erstellen',
            'Sie sind verpflichtet, die App gesetzeskonform zu nutzen',
            'Sie dürfen den Quellcode nicht zurückentwickeln'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Verbotene Nutzung',
          items: [
            'Sie dürfen die App nicht zur Verbreitung von Malware oder Viren nutzen',
            'Sie dürfen die Erfahrung anderer Benutzer nicht negativ beeinflussen',
            'Sie dürfen nicht versuchen, die Sicherheitssysteme zu umgehen',
            'Sie dürfen das System nicht durch gefälschte Konten manipulieren'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Haftungsausschluss',
          items: [
            'Die App wird "wie besehen" bereitgestellt',
            'Wir sind nicht verantwortlich für Datenverlust',
            'Wir garantieren keinen unterbrechungsfreien Betrieb',
            'Wir sind nicht verantwortlich für Probleme von Drittanbietern'
          ]
        }
      ],
      premium: {
        title: 'Premium-Mitgliedschaft',
        description: 'Beim Kauf der Premium-Mitgliedschaft stimmen Sie zu:',
        items: [
          'Zahlungen werden über sichere Zahlungsanbieter abgewickelt',
          'Die Premium-Mitgliedschaft verlängert sich nicht automatisch',
          'Rückerstattungsrichtlinie: Volle Rückerstattung innerhalb der ersten 7 Tage',
          'Premium-Funktionen werden sofort nach Zahlung aktiviert'
        ]
      },
      changes: {
        title: 'Änderungen',
        description: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden Benutzer über wesentliche Änderungen informieren.'
      },
      contact: {
        title: 'Kontakt',
        description: 'Für Fragen zu diesen Bedingungen:'
      }
    },
    it: {
      title: 'Termini di Servizio',
      lastUpdated: 'Ultimo Aggiornamento: 20 ottobre 2025',
      intro: {
        title: 'Accetti Questi Termini',
        description: 'Utilizzando l\'applicazione Tracciatore di Abitudini, accetti i seguenti termini di servizio.'
      },
      sections: [
        {
          icon: CheckCircle,
          color: 'green',
          title: 'Utilizzo del Servizio',
          items: [
            'Puoi utilizzare l\'app per scopi personali e non commerciali',
            'Puoi creare solo un account per dispositivo',
            'Sei obbligato a utilizzare l\'app conformemente alle leggi',
            'Non puoi effettuare reverse engineering del codice sorgente'
          ]
        },
        {
          icon: XCircle,
          color: 'red',
          title: 'Utilizzi Vietati',
          items: [
            'Non puoi usare l\'app per diffondere malware o virus',
            'Non puoi influenzare negativamente l\'esperienza di altri utenti',
            'Non puoi tentare di aggirare i sistemi di sicurezza',
            'Non puoi manipolare il sistema creando account falsi'
          ]
        },
        {
          icon: AlertTriangle,
          color: 'yellow',
          title: 'Esclusione di Responsabilità',
          items: [
            'L\'app è fornita "così com\'è"',
            'Non siamo responsabili per la perdita di dati',
            'Non garantiamo un funzionamento ininterrotto',
            'Non siamo responsabili per problemi di servizi di terze parti'
          ]
        }
      ],
      premium: {
        title: 'Abbonamento Premium',
        description: 'Acquistando l\'abbonamento premium, accetti:',
        items: [
          'I pagamenti sono elaborati tramite fornitori di pagamento sicuri',
          'L\'abbonamento premium non si rinnova automaticamente',
          'Politica di rimborso: Rimborso completo entro i primi 7 giorni',
          'Le funzionalità premium vengono attivate immediatamente dopo il pagamento'
        ]
      },
      changes: {
        title: 'Modifiche',
        description: 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Informeremo gli utenti di modifiche significative.'
      },
      contact: {
        title: 'Contatto',
        description: 'Per domande su questi termini:'
      }
    }
  };

  const pageContent = content[language as keyof typeof content] || content.tr;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900 dark:text-gray-100" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-3">{pageContent.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Intro */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {pageContent.intro.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {pageContent.lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {pageContent.intro.description}
          </p>
        </div>

        {/* Sections */}
        {pageContent.sections.map((section, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <section.icon size={24} className={`text-${section.color}-500`} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{section.title}</h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3">
                  <span className={`text-${section.color}-500 mt-1`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Premium */}
        <div className="bg-gradient-to-br from-primary-50 to-orange-50 dark:from-primary-900/30 dark:to-orange-900/30 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{pageContent.premium.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.premium.description}</p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {pageContent.premium.items.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Changes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{pageContent.changes.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{pageContent.changes.description}</p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{pageContent.contact.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.contact.description}</p>
          <a
            href="mailto:support@habitracker.com"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <span>support@habitracker.com</span>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          <p>{pageContent.lastUpdated}</p>
          <p className="mt-2">{t('copyright')}</p>
        </div>
      </div>
    </div>
  );
};
