import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Server, Mail } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useHabitStore();

  const content = {
    tr: {
      title: 'Gizlilik Politikası',
      lastUpdated: 'Son Güncelleme: 20 Ekim 2025',
      intro: {
        heading: 'Gizliliğiniz Bizim İçin Önemli',
        description: 'Alışkanlık Takipçisi olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, uygulamamızı kullanırken verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.'
      },
      dataCollection: {
        title: 'Veri Toplama',
        subtitle: 'Topladığımız Veriler:',
        items: [
          'Oluşturduğunuz alışkanlık bilgileri (isim, açıklama, renk, ikon)',
          'Alışkanlık tamamlanma tarihleri ve istatistikler',
          'Tercihleriniz (tema, dil, bildirim ayarları)',
          'Premium üyelik durumunuz'
        ],
        highlight: '✓ Tüm verileriniz cihazınızda yerel olarak saklanır',
        highlightDesc: 'Hiçbir veri sunucularımıza gönderilmez veya üçüncü taraflarla paylaşılmaz.'
      },
      dataStorage: {
        title: 'Veri Depolama',
        description: 'Tüm verileriniz tarayıcınızın IndexedDB veritabanında yerel olarak saklanır. Bu şu anlama gelir:',
        items: [
          'Verileriniz sadece sizin cihazınızda bulunur',
          'İnternet bağlantısı olmadan da çalışabilirsiniz',
          'Verilere sadece siz erişebilirsiniz',
          'Tarayıcı önbelleğini temizlerseniz veriler silinir'
        ],
        tips: {
          title: '💡 Öneriler',
          items: [
            '• Düzenli olarak verilerinizi dışa aktarın (Ayarlar → Veri Yönetimi)',
            '• Yedek dosyalarınızı güvenli bir yerde saklayın'
          ]
        }
      },
      dataSecurity: {
        title: 'Veri Güvenliği',
        description: 'Verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:',
        features: [
          {
            icon: '🔒',
            title: 'Yerel Şifreleme',
            description: 'Veriler tarayıcının güvenli depolama alanında saklanır'
          },
          {
            icon: '🚫',
            title: 'Sunucu Yok',
            description: 'Hiçbir veri dışarı gönderilmez'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'Tüm bağlantılar şifreli'
          },
          {
            icon: '👤',
            title: 'Gizlilik',
            description: 'Kişisel bilgi toplamıyoruz'
          }
        ]
      },
      userRights: {
        title: 'Haklarınız',
        rights: [
          {
            title: 'Erişim Hakkı',
            description: 'Verilerinizi istediğiniz zaman görüntüleyebilirsiniz'
          },
          {
            title: 'Silme Hakkı',
            description: 'Verilerinizi istediğiniz zaman tamamen silebilirsiniz'
          },
          {
            title: 'Taşıma Hakkı',
            description: 'Verilerinizi JSON formatında dışa aktarabilirsiniz'
          },
          {
            title: 'İtiraz Hakkı',
            description: 'Veri işlemeye istediğiniz zaman itiraz edebilirsiniz'
          }
        ]
      },
      thirdParty: {
        title: 'Üçüncü Taraf Hizmetler',
        description: 'Uygulamamız aşağıdaki üçüncü taraf hizmetleri kullanmaktadır:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Font yüklemek için kullanılır. IP adresiniz Google ile paylaşılabilir.'
          },
          {
            title: 'Tarayıcı Bildirimleri',
            description: 'İzninizle yerel bildirimler gönderilebilir. Hiçbir veri üçüncü taraflara gitmez.'
          }
        ]
      },
      contact: {
        title: 'İletişim',
        description: 'Gizlilik politikamız hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz:'
      },
      footer: {
        updated: 'Bu gizlilik politikası en son 20 Ekim 2025 tarihinde güncellenmiştir.',
        copyright: '© 2025 Alışkanlık Takipçisi. Tüm hakları saklıdır.'
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: October 20, 2025',
      intro: {
        heading: 'Your Privacy Matters to Us',
        description: 'As Habit Tracker, we greatly value the privacy of our users. This privacy policy explains how your data is collected, used, and protected when using our application.'
      },
      dataCollection: {
        title: 'Data Collection',
        subtitle: 'Data We Collect:',
        items: [
          'Habit information you create (name, description, color, icon)',
          'Habit completion dates and statistics',
          'Your preferences (theme, language, notification settings)',
          'Your premium membership status'
        ],
        highlight: '✓ All your data is stored locally on your device',
        highlightDesc: 'No data is sent to our servers or shared with third parties.'
      },
      dataStorage: {
        title: 'Data Storage',
        description: 'All your data is stored locally in your browser\'s IndexedDB database. This means:',
        items: [
          'Your data only exists on your device',
          'You can work without an internet connection',
          'Only you can access your data',
          'Data is deleted if you clear browser cache'
        ],
        tips: {
          title: '💡 Recommendations',
          items: [
            '• Regularly export your data (Settings → Data Management)',
            '• Keep your backup files in a safe place'
          ]
        }
      },
      dataSecurity: {
        title: 'Data Security',
        description: 'We take the following measures to secure your data:',
        features: [
          {
            icon: '🔒',
            title: 'Local Encryption',
            description: 'Data is stored in the browser\'s secure storage area'
          },
          {
            icon: '🚫',
            title: 'No Server',
            description: 'No data is sent out'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'All connections are encrypted'
          },
          {
            icon: '👤',
            title: 'Privacy',
            description: 'We don\'t collect personal information'
          }
        ]
      },
      userRights: {
        title: 'Your Rights',
        rights: [
          {
            title: 'Right to Access',
            description: 'You can view your data at any time'
          },
          {
            title: 'Right to Delete',
            description: 'You can completely delete your data at any time'
          },
          {
            title: 'Right to Portability',
            description: 'You can export your data in JSON format'
          },
          {
            title: 'Right to Object',
            description: 'You can object to data processing at any time'
          }
        ]
      },
      thirdParty: {
        title: 'Third Party Services',
        description: 'Our application uses the following third party services:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Used to load fonts. Your IP address may be shared with Google.'
          },
          {
            title: 'Browser Notifications',
            description: 'Local notifications can be sent with your permission. No data goes to third parties.'
          }
        ]
      },
      contact: {
        title: 'Contact',
        description: 'If you have any questions about our privacy policy, you can contact us:'
      },
      footer: {
        updated: 'This privacy policy was last updated on October 20, 2025.',
        copyright: '© 2025 Habit Tracker. All rights reserved.'
      }
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última Actualización: 20 de Octubre de 2025',
      intro: {
        heading: 'Tu Privacidad Nos Importa',
        description: 'Como Rastreador de Hábitos, valoramos enormemente la privacidad de nuestros usuarios. Esta política de privacidad explica cómo se recopilan, utilizan y protegen sus datos al usar nuestra aplicación.'
      },
      dataCollection: {
        title: 'Recopilación de Datos',
        subtitle: 'Datos Que Recopilamos:',
        items: [
          'Información de hábitos que creas (nombre, descripción, color, ícono)',
          'Fechas de finalización de hábitos y estadísticas',
          'Tus preferencias (tema, idioma, configuración de notificaciones)',
          'Tu estado de membresía premium'
        ],
        highlight: '✓ Todos tus datos se almacenan localmente en tu dispositivo',
        highlightDesc: 'Ningún dato se envía a nuestros servidores ni se comparte con terceros.'
      },
      dataStorage: {
        title: 'Almacenamiento de Datos',
        description: 'Todos tus datos se almacenan localmente en la base de datos IndexedDB de tu navegador. Esto significa:',
        items: [
          'Tus datos solo existen en tu dispositivo',
          'Puedes trabajar sin conexión a Internet',
          'Solo tú puedes acceder a tus datos',
          'Los datos se eliminan si borras la caché del navegador'
        ],
        tips: {
          title: '💡 Recomendaciones',
          items: [
            '• Exporta regularmente tus datos (Configuración → Gestión de Datos)',
            '• Guarda tus archivos de respaldo en un lugar seguro'
          ]
        }
      },
      dataSecurity: {
        title: 'Seguridad de Datos',
        description: 'Tomamos las siguientes medidas para asegurar tus datos:',
        features: [
          {
            icon: '🔒',
            title: 'Cifrado Local',
            description: 'Los datos se almacenan en el área de almacenamiento seguro del navegador'
          },
          {
            icon: '🚫',
            title: 'Sin Servidor',
            description: 'No se envían datos fuera'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'Todas las conexiones están cifradas'
          },
          {
            icon: '👤',
            title: 'Privacidad',
            description: 'No recopilamos información personal'
          }
        ]
      },
      userRights: {
        title: 'Tus Derechos',
        rights: [
          {
            title: 'Derecho de Acceso',
            description: 'Puedes ver tus datos en cualquier momento'
          },
          {
            title: 'Derecho de Eliminación',
            description: 'Puedes eliminar completamente tus datos en cualquier momento'
          },
          {
            title: 'Derecho de Portabilidad',
            description: 'Puedes exportar tus datos en formato JSON'
          },
          {
            title: 'Derecho de Objeción',
            description: 'Puedes objetar el procesamiento de datos en cualquier momento'
          }
        ]
      },
      thirdParty: {
        title: 'Servicios de Terceros',
        description: 'Nuestra aplicación utiliza los siguientes servicios de terceros:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Utilizado para cargar fuentes. Tu dirección IP puede ser compartida con Google.'
          },
          {
            title: 'Notificaciones del Navegador',
            description: 'Se pueden enviar notificaciones locales con tu permiso. Ningún dato va a terceros.'
          }
        ]
      },
      contact: {
        title: 'Contacto',
        description: 'Si tienes alguna pregunta sobre nuestra política de privacidad, puedes contactarnos:'
      },
      footer: {
        updated: 'Esta política de privacidad se actualizó por última vez el 20 de octubre de 2025.',
        copyright: '© 2025 Rastreador de Hábitos. Todos los derechos reservados.'
      }
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière Mise à Jour: 20 Octobre 2025',
      intro: {
        heading: 'Votre Vie Privée Compte Pour Nous',
        description: 'En tant que Suivi des Habitudes, nous accordons une grande importance à la confidentialité de nos utilisateurs. Cette politique de confidentialité explique comment vos données sont collectées, utilisées et protégées lors de l\'utilisation de notre application.'
      },
      dataCollection: {
        title: 'Collection de Données',
        subtitle: 'Données Que Nous Collectons:',
        items: [
          'Informations d\'habitudes que vous créez (nom, description, couleur, icône)',
          'Dates de complétion des habitudes et statistiques',
          'Vos préférences (thème, langue, paramètres de notification)',
          'Votre statut d\'adhésion premium'
        ],
        highlight: '✓ Toutes vos données sont stockées localement sur votre appareil',
        highlightDesc: 'Aucune donnée n\'est envoyée à nos serveurs ou partagée avec des tiers.'
      },
      dataStorage: {
        title: 'Stockage des Données',
        description: 'Toutes vos données sont stockées localement dans la base de données IndexedDB de votre navigateur. Cela signifie:',
        items: [
          'Vos données n\'existent que sur votre appareil',
          'Vous pouvez travailler sans connexion Internet',
          'Vous seul pouvez accéder à vos données',
          'Les données sont supprimées si vous videz le cache du navigateur'
        ],
        tips: {
          title: '💡 Recommandations',
          items: [
            '• Exportez régulièrement vos données (Paramètres → Gestion des Données)',
            '• Conservez vos fichiers de sauvegarde dans un endroit sûr'
          ]
        }
      },
      dataSecurity: {
        title: 'Sécurité des Données',
        description: 'Nous prenons les mesures suivantes pour sécuriser vos données:',
        features: [
          {
            icon: '🔒',
            title: 'Cryptage Local',
            description: 'Les données sont stockées dans la zone de stockage sécurisée du navigateur'
          },
          {
            icon: '🚫',
            title: 'Pas de Serveur',
            description: 'Aucune donnée n\'est envoyée à l\'extérieur'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'Toutes les connexions sont cryptées'
          },
          {
            icon: '👤',
            title: 'Confidentialité',
            description: 'Nous ne collectons pas d\'informations personnelles'
          }
        ]
      },
      userRights: {
        title: 'Vos Droits',
        rights: [
          {
            title: 'Droit d\'Accès',
            description: 'Vous pouvez consulter vos données à tout moment'
          },
          {
            title: 'Droit de Suppression',
            description: 'Vous pouvez supprimer complètement vos données à tout moment'
          },
          {
            title: 'Droit à la Portabilité',
            description: 'Vous pouvez exporter vos données au format JSON'
          },
          {
            title: 'Droit d\'Opposition',
            description: 'Vous pouvez vous opposer au traitement des données à tout moment'
          }
        ]
      },
      thirdParty: {
        title: 'Services Tiers',
        description: 'Notre application utilise les services tiers suivants:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Utilisé pour charger les polices. Votre adresse IP peut être partagée avec Google.'
          },
          {
            title: 'Notifications du Navigateur',
            description: 'Des notifications locales peuvent être envoyées avec votre permission. Aucune donnée ne va vers des tiers.'
          }
        ]
      },
      contact: {
        title: 'Contact',
        description: 'Si vous avez des questions sur notre politique de confidentialité, vous pouvez nous contacter:'
      },
      footer: {
        updated: 'Cette politique de confidentialité a été mise à jour pour la dernière fois le 20 octobre 2025.',
        copyright: '© 2025 Suivi des Habitudes. Tous droits réservés.'
      }
    },
    de: {
      title: 'Datenschutzrichtlinie',
      lastUpdated: 'Letzte Aktualisierung: 20. Oktober 2025',
      intro: {
        heading: 'Ihre Privatsphäre Ist Uns Wichtig',
        description: 'Als Gewohnheits-Tracker schätzen wir die Privatsphäre unserer Benutzer sehr. Diese Datenschutzrichtlinie erklärt, wie Ihre Daten bei der Verwendung unserer Anwendung erfasst, verwendet und geschützt werden.'
      },
      dataCollection: {
        title: 'Datenerfassung',
        subtitle: 'Daten, Die Wir Erfassen:',
        items: [
          'Gewohnheitsinformationen, die Sie erstellen (Name, Beschreibung, Farbe, Symbol)',
          'Gewohnheitsabschlussdaten und Statistiken',
          'Ihre Präferenzen (Theme, Sprache, Benachrichtigungseinstellungen)',
          'Ihr Premium-Mitgliedschaftsstatus'
        ],
        highlight: '✓ Alle Ihre Daten werden lokal auf Ihrem Gerät gespeichert',
        highlightDesc: 'Es werden keine Daten an unsere Server gesendet oder mit Dritten geteilt.'
      },
      dataStorage: {
        title: 'Datenspeicherung',
        description: 'Alle Ihre Daten werden lokal in der IndexedDB-Datenbank Ihres Browsers gespeichert. Dies bedeutet:',
        items: [
          'Ihre Daten existieren nur auf Ihrem Gerät',
          'Sie können ohne Internetverbindung arbeiten',
          'Nur Sie können auf Ihre Daten zugreifen',
          'Daten werden gelöscht, wenn Sie den Browser-Cache leeren'
        ],
        tips: {
          title: '💡 Empfehlungen',
          items: [
            '• Exportieren Sie regelmäßig Ihre Daten (Einstellungen → Datenverwaltung)',
            '• Bewahren Sie Ihre Sicherungsdateien an einem sicheren Ort auf'
          ]
        }
      },
      dataSecurity: {
        title: 'Datensicherheit',
        description: 'Wir ergreifen folgende Maßnahmen, um Ihre Daten zu sichern:',
        features: [
          {
            icon: '🔒',
            title: 'Lokale Verschlüsselung',
            description: 'Daten werden im sicheren Speicherbereich des Browsers gespeichert'
          },
          {
            icon: '🚫',
            title: 'Kein Server',
            description: 'Es werden keine Daten nach außen gesendet'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'Alle Verbindungen sind verschlüsselt'
          },
          {
            icon: '👤',
            title: 'Datenschutz',
            description: 'Wir sammeln keine persönlichen Informationen'
          }
        ]
      },
      userRights: {
        title: 'Ihre Rechte',
        rights: [
          {
            title: 'Zugriffsrecht',
            description: 'Sie können Ihre Daten jederzeit einsehen'
          },
          {
            title: 'Löschungsrecht',
            description: 'Sie können Ihre Daten jederzeit vollständig löschen'
          },
          {
            title: 'Recht auf Portabilität',
            description: 'Sie können Ihre Daten im JSON-Format exportieren'
          },
          {
            title: 'Widerspruchsrecht',
            description: 'Sie können der Datenverarbeitung jederzeit widersprechen'
          }
        ]
      },
      thirdParty: {
        title: 'Dienste Dritter',
        description: 'Unsere Anwendung verwendet die folgenden Dienste Dritter:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Wird zum Laden von Schriftarten verwendet. Ihre IP-Adresse kann mit Google geteilt werden.'
          },
          {
            title: 'Browser-Benachrichtigungen',
            description: 'Lokale Benachrichtigungen können mit Ihrer Erlaubnis gesendet werden. Keine Daten gehen an Dritte.'
          }
        ]
      },
      contact: {
        title: 'Kontakt',
        description: 'Wenn Sie Fragen zu unserer Datenschutzrichtlinie haben, können Sie uns kontaktieren:'
      },
      footer: {
        updated: 'Diese Datenschutzrichtlinie wurde zuletzt am 20. Oktober 2025 aktualisiert.',
        copyright: '© 2025 Gewohnheits-Tracker. Alle Rechte vorbehalten.'
      }
    },
    it: {
      title: 'Informativa sulla Privacy',
      lastUpdated: 'Ultimo Aggiornamento: 20 Ottobre 2025',
      intro: {
        heading: 'La Tua Privacy Ci Importa',
        description: 'Come Tracciatore di Abitudini, diamo grande valore alla privacy dei nostri utenti. Questa informativa sulla privacy spiega come i tuoi dati vengono raccolti, utilizzati e protetti quando usi la nostra applicazione.'
      },
      dataCollection: {
        title: 'Raccolta Dati',
        subtitle: 'Dati Che Raccogliamo:',
        items: [
          'Informazioni sulle abitudini che crei (nome, descrizione, colore, icona)',
          'Date di completamento delle abitudini e statistiche',
          'Le tue preferenze (tema, lingua, impostazioni di notifica)',
          'Il tuo stato di abbonamento premium'
        ],
        highlight: '✓ Tutti i tuoi dati sono archiviati localmente sul tuo dispositivo',
        highlightDesc: 'Nessun dato viene inviato ai nostri server o condiviso con terze parti.'
      },
      dataStorage: {
        title: 'Archiviazione Dati',
        description: 'Tutti i tuoi dati sono archiviati localmente nel database IndexedDB del tuo browser. Questo significa:',
        items: [
          'I tuoi dati esistono solo sul tuo dispositivo',
          'Puoi lavorare senza connessione Internet',
          'Solo tu puoi accedere ai tuoi dati',
          'I dati vengono eliminati se cancelli la cache del browser'
        ],
        tips: {
          title: '💡 Raccomandazioni',
          items: [
            '• Esporta regolarmente i tuoi dati (Impostazioni → Gestione Dati)',
            '• Conserva i tuoi file di backup in un luogo sicuro'
          ]
        }
      },
      dataSecurity: {
        title: 'Sicurezza dei Dati',
        description: 'Prendiamo le seguenti misure per proteggere i tuoi dati:',
        features: [
          {
            icon: '🔒',
            title: 'Crittografia Locale',
            description: 'I dati sono archiviati nell\'area di archiviazione sicura del browser'
          },
          {
            icon: '🚫',
            title: 'Nessun Server',
            description: 'Nessun dato viene inviato fuori'
          },
          {
            icon: '🔐',
            title: 'HTTPS',
            description: 'Tutte le connessioni sono crittografate'
          },
          {
            icon: '👤',
            title: 'Privacy',
            description: 'Non raccogliamo informazioni personali'
          }
        ]
      },
      userRights: {
        title: 'I Tuoi Diritti',
        rights: [
          {
            title: 'Diritto di Accesso',
            description: 'Puoi visualizzare i tuoi dati in qualsiasi momento'
          },
          {
            title: 'Diritto di Cancellazione',
            description: 'Puoi eliminare completamente i tuoi dati in qualsiasi momento'
          },
          {
            title: 'Diritto alla Portabilità',
            description: 'Puoi esportare i tuoi dati in formato JSON'
          },
          {
            title: 'Diritto di Opposizione',
            description: 'Puoi opporti al trattamento dei dati in qualsiasi momento'
          }
        ]
      },
      thirdParty: {
        title: 'Servizi di Terze Parti',
        description: 'La nostra applicazione utilizza i seguenti servizi di terze parti:',
        services: [
          {
            title: 'Google Fonts',
            description: 'Utilizzato per caricare i caratteri. Il tuo indirizzo IP può essere condiviso con Google.'
          },
          {
            title: 'Notifiche del Browser',
            description: 'Possono essere inviate notifiche locali con il tuo permesso. Nessun dato va a terze parti.'
          }
        ]
      },
      contact: {
        title: 'Contatto',
        description: 'Se hai domande sulla nostra informativa sulla privacy, puoi contattarci:'
      },
      footer: {
        updated: 'Questa informativa sulla privacy è stata aggiornata l\'ultima volta il 20 ottobre 2025.',
        copyright: '© 2025 Tracciatore di Abitudini. Tutti i diritti riservati.'
      }
    }
  };

  const pageContent = content[language] || content.tr;

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
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield size={32} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {pageContent.intro.heading}
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

        {/* Data Collection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Eye size={24} className="text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pageContent.dataCollection.title}</h3>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{pageContent.dataCollection.subtitle}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {pageContent.dataCollection.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-800 dark:text-green-300 font-medium">
                {pageContent.dataCollection.highlight}
              </p>
              <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                {pageContent.dataCollection.highlightDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Data Storage */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Server size={24} className="text-purple-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pageContent.dataStorage.title}</h3>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{pageContent.dataStorage.description}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {pageContent.dataStorage.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded mt-4">
              <p className="text-blue-800 dark:text-blue-300 font-medium">
                {pageContent.dataStorage.tips.title}
              </p>
              <ul className="text-blue-700 dark:text-blue-400 text-sm mt-2 space-y-1">
                {pageContent.dataStorage.tips.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Lock size={24} className="text-red-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pageContent.dataSecurity.title}</h3>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{pageContent.dataSecurity.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {pageContent.dataSecurity.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.icon} {feature.title}</h4>
                  <p className="text-sm dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Rights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Shield size={24} className="text-green-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pageContent.userRights.title}</h3>
          </div>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            {pageContent.userRights.rights.map((right, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{right.title}</p>
                  <p className="text-sm dark:text-gray-400">{right.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third Party Services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{pageContent.thirdParty.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {pageContent.thirdParty.description}
          </p>
          <div className="space-y-3">
            {pageContent.thirdParty.services.map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{service.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Mail size={24} className="text-primary-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pageContent.contact.title}</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {pageContent.contact.description}
          </p>
          <a
            href="mailto:support@habitracker.com"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <Mail size={20} />
            <span>support@habitracker.com</span>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          <p>{pageContent.footer.updated}</p>
          <p className="mt-2">{pageContent.footer.copyright}</p>
        </div>
      </div>
    </div>
  );
};
