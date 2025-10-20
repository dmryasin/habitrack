import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Mail, MessageCircle } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useHabitStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const content = {
    tr: {
      title: 'Yardım & SSS',
      intro: {
        heading: 'Size Nasıl Yardımcı Olabiliriz?',
        description: 'Sık sorulan sorular ve cevapları aşağıda bulabilirsiniz. Sorununuzu bulamazsanız, bizimle iletişime geçin.'
      },
      quickLinks: {
        email: {
          title: 'E-posta Desteği',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Gizlilik',
          description: 'Gizlilik politikamız'
        },
        feedback: {
          title: 'Geri Bildirim',
          description: 'Fikirlerinizi paylaşın'
        }
      },
      categories: {
        gettingStarted: 'Başlangıç',
        habits: 'Alışkanlıklar',
        statistics: 'İstatistikler',
        premium: 'Premium',
        data: 'Veri',
        technical: 'Teknik'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: 'Alışkanlık Takipçisi nasıl kullanılır?',
          answer: 'Ana sayfada "+" butonuna tıklayarak yeni bir alışkanlık ekleyin. Alışkanlığınıza isim, açıklama, renk ve ikon seçin. Ardından her gün alışkanlığınızı tamamladığınızda kartın üzerindeki onay butonuna tıklayın.'
        },
        {
          category: 'gettingStarted',
          question: 'Kaç alışkanlık ekleyebilirim?',
          answer: 'Ücretsiz sürümde maksimum 3 alışkanlık ekleyebilirsiniz. Premium üyelik ile sınırsız alışkanlık ekleyebilirsiniz.'
        },
        {
          category: 'habits',
          question: 'Alışkanlık nasıl düzenlenir veya silinir?',
          answer: 'Alışkanlık kartına tıklayarak düzenleme sayfasına gidin. Buradan alışkanlığınızı düzenleyebilir veya "Alışkanlığı Sil" butonuna tıklayarak silebilirsiniz.'
        },
        {
          category: 'habits',
          question: 'Seri (streak) nedir?',
          answer: 'Seri, bir alışkanlığı arka arkaya kaç gün tamamladığınızı gösterir. Örneğin, kitap okuma alışkanlığınızı 7 gün üst üste tamamlarsanız, seriniz 7 olur. Bir gün atlarsanız seri sıfırlanır.'
        },
        {
          category: 'habits',
          question: 'Geçmiş günlere alışkanlık ekleyebilir miyim?',
          answer: 'Şu anda sadece bugünün alışkanlıklarını işaretleyebilirsiniz. Geçmiş güne dönük işaretleme özelliği gelecek güncellemelerde eklenecektir.'
        },
        {
          category: 'statistics',
          question: 'İstatistikler nasıl hesaplanır?',
          answer: 'Başarı oranı son 30 gün içindeki tamamlanma yüzdesini gösterir. Toplam tamamlama, alışkanlığı kaç kez tamamladığınızı, en uzun seri ise hiç kesintisiz en uzun tamamlama sürenizi gösterir.'
        },
        {
          category: 'statistics',
          question: 'İstatistiklerimi nasıl görüntülerim?',
          answer: 'Alt menüden "İstatistikler" sekmesine tıklayın. Burada tüm alışkanlıklarınızın detaylı istatistiklerini görebilirsiniz.'
        },
        {
          category: 'premium',
          question: 'Premium üyelik nedir?',
          answer: 'Premium üyelik ile sınırsız alışkanlık ekleyebilir, reklamsız deneyim yaşayabilir, gelişmiş istatistiklere erişebilir ve veri yedekleme özelliğini kullanabilirsiniz.'
        },
        {
          category: 'premium',
          question: 'Premium üyelik nasıl alınır?',
          answer: 'Ayarlar → Premium Durumu veya ana sayfadaki Premium banner\'ına tıklayın. Aylık veya yıllık plan seçeneklerinden birini seçerek satın alabilirsiniz.'
        },
        {
          category: 'premium',
          question: 'Premium üyeliği iptal edebilir miyim?',
          answer: 'Evet, istediğiniz zaman premium üyeliğinizi iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar premium özelliklerden yararlanmaya devam edersiniz.'
        },
        {
          category: 'data',
          question: 'Verilerim güvende mi?',
          answer: 'Evet, tüm verileriniz cihazınızda yerel olarak (IndexedDB) saklanır. Hiçbir veri sunucularımıza gönderilmez. Verilerinize sadece siz erişebilirsiniz.'
        },
        {
          category: 'data',
          question: 'Verilerimi yedekleyebilir miyim?',
          answer: 'Evet! Ayarlar → Veri Yönetimi → Verileri Dışa Aktar seçeneği ile tüm verilerinizi JSON dosyası olarak kaydedebilirsiniz. Bu dosyayı güvenli bir yerde saklayın.'
        },
        {
          category: 'data',
          question: 'Telefon değiştirirsem verilerim kaybolur mu?',
          answer: 'Evet, veriler yerel olarak saklandığı için cihaz değiştirdiğinizde kaybolur. Ancak dışa aktarma özelliği ile yedek alıp yeni cihazda içe aktarabilirsiniz.'
        },
        {
          category: 'technical',
          question: 'Hangi tarayıcılarda çalışır?',
          answer: 'Chrome, Firefox, Safari, Edge gibi tüm modern tarayıcılarda sorunsuz çalışır. En iyi deneyim için güncel tarayıcı versiyonları önerilir.'
        },
        {
          category: 'technical',
          question: 'Offline çalışır mı?',
          answer: 'Evet, PWA (Progressive Web App) teknolojisi sayesinde internet bağlantısı olmadan da kullanabilirsiniz. Ana ekrana eklediğinizde uygulama gibi çalışır.'
        },
        {
          category: 'technical',
          question: 'Bildirimleri nasıl açarım?',
          answer: 'Ayarlar → Tercihler → Bildirimler bölümünden bildirimleri açabilirsiniz. Tarayıcınız izin isteyecektir, "İzin ver" seçeneğine tıklayın.'
        }
      ],
      contact: {
        title: 'Hala Yardıma mı İhtiyacınız Var?',
        description: 'Sorununuz yukarıdaki cevaplar arasında yoksa, bizimle iletişime geçmekten çekinmeyin.',
        button: 'Bize Ulaşın'
      }
    },
    en: {
      title: 'Help & FAQ',
      intro: {
        heading: 'How Can We Help You?',
        description: 'You can find frequently asked questions and answers below. If you can\'t find your issue, contact us.'
      },
      quickLinks: {
        email: {
          title: 'Email Support',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Privacy',
          description: 'Our privacy policy'
        },
        feedback: {
          title: 'Feedback',
          description: 'Share your ideas'
        }
      },
      categories: {
        gettingStarted: 'Getting Started',
        habits: 'Habits',
        statistics: 'Statistics',
        premium: 'Premium',
        data: 'Data',
        technical: 'Technical'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: 'How to use Habit Tracker?',
          answer: 'Click the "+" button on the home page to add a new habit. Choose a name, description, color and icon for your habit. Then click the check button on the card each day when you complete your habit.'
        },
        {
          category: 'gettingStarted',
          question: 'How many habits can I add?',
          answer: 'You can add a maximum of 3 habits in the free version. With premium membership, you can add unlimited habits.'
        },
        {
          category: 'habits',
          question: 'How to edit or delete a habit?',
          answer: 'Click on the habit card to go to the edit page. From there you can edit your habit or delete it by clicking the "Delete Habit" button.'
        },
        {
          category: 'habits',
          question: 'What is a streak?',
          answer: 'A streak shows how many days in a row you have completed a habit. For example, if you complete your reading habit for 7 consecutive days, your streak will be 7. If you miss a day, the streak resets.'
        },
        {
          category: 'habits',
          question: 'Can I add habits for past days?',
          answer: 'Currently you can only mark today\'s habits. The ability to mark past days will be added in future updates.'
        },
        {
          category: 'statistics',
          question: 'How are statistics calculated?',
          answer: 'Success rate shows the completion percentage in the last 30 days. Total completions show how many times you completed the habit, and longest streak shows your longest uninterrupted completion period.'
        },
        {
          category: 'statistics',
          question: 'How do I view my statistics?',
          answer: 'Click the "Statistics" tab from the bottom menu. Here you can see detailed statistics of all your habits.'
        },
        {
          category: 'premium',
          question: 'What is premium membership?',
          answer: 'With premium membership, you can add unlimited habits, enjoy an ad-free experience, access advanced statistics, and use the data backup feature.'
        },
        {
          category: 'premium',
          question: 'How to get premium membership?',
          answer: 'Click Settings → Premium Status or the Premium banner on the home page. You can purchase by choosing from monthly or yearly plan options.'
        },
        {
          category: 'premium',
          question: 'Can I cancel premium membership?',
          answer: 'Yes, you can cancel your premium membership at any time. After cancellation, you will continue to enjoy premium features until the end of the current period.'
        },
        {
          category: 'data',
          question: 'Is my data safe?',
          answer: 'Yes, all your data is stored locally on your device (IndexedDB). No data is sent to our servers. Only you can access your data.'
        },
        {
          category: 'data',
          question: 'Can I backup my data?',
          answer: 'Yes! You can save all your data as a JSON file with Settings → Data Management → Export Data option. Keep this file in a safe place.'
        },
        {
          category: 'data',
          question: 'Will I lose my data if I change phones?',
          answer: 'Yes, since data is stored locally, it will be lost when you change devices. However, you can backup using the export feature and import on your new device.'
        },
        {
          category: 'technical',
          question: 'Which browsers does it work on?',
          answer: 'It works seamlessly on all modern browsers like Chrome, Firefox, Safari, Edge. Updated browser versions are recommended for the best experience.'
        },
        {
          category: 'technical',
          question: 'Does it work offline?',
          answer: 'Yes, thanks to PWA (Progressive Web App) technology, you can use it without an internet connection. When you add it to the home screen, it works like an app.'
        },
        {
          category: 'technical',
          question: 'How do I enable notifications?',
          answer: 'You can enable notifications from Settings → Preferences → Notifications. Your browser will ask for permission, click "Allow".'
        }
      ],
      contact: {
        title: 'Still Need Help?',
        description: 'If your issue is not among the answers above, feel free to contact us.',
        button: 'Contact Us'
      }
    },
    es: {
      title: 'Ayuda y Preguntas',
      intro: {
        heading: '¿Cómo Podemos Ayudarte?',
        description: 'Puedes encontrar preguntas frecuentes y respuestas a continuación. Si no encuentras tu problema, contáctanos.'
      },
      quickLinks: {
        email: {
          title: 'Soporte por Email',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Privacidad',
          description: 'Nuestra política de privacidad'
        },
        feedback: {
          title: 'Comentarios',
          description: 'Comparte tus ideas'
        }
      },
      categories: {
        gettingStarted: 'Comenzando',
        habits: 'Hábitos',
        statistics: 'Estadísticas',
        premium: 'Premium',
        data: 'Datos',
        technical: 'Técnico'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: '¿Cómo usar el Rastreador de Hábitos?',
          answer: 'Haga clic en el botón "+" en la página de inicio para agregar un nuevo hábito. Elija un nombre, descripción, color e ícono para su hábito. Luego haga clic en el botón de verificación en la tarjeta cada día cuando complete su hábito.'
        },
        {
          category: 'gettingStarted',
          question: '¿Cuántos hábitos puedo agregar?',
          answer: 'Puedes agregar un máximo de 3 hábitos en la versión gratuita. Con la membresía premium, puedes agregar hábitos ilimitados.'
        },
        {
          category: 'habits',
          question: '¿Cómo editar o eliminar un hábito?',
          answer: 'Haga clic en la tarjeta de hábito para ir a la página de edición. Desde allí puede editar su hábito o eliminarlo haciendo clic en el botón "Eliminar Hábito".'
        },
        {
          category: 'habits',
          question: '¿Qué es una racha?',
          answer: 'Una racha muestra cuántos días seguidos has completado un hábito. Por ejemplo, si completas tu hábito de lectura durante 7 días consecutivos, tu racha será 7. Si te pierdes un día, la racha se reinicia.'
        },
        {
          category: 'habits',
          question: '¿Puedo agregar hábitos para días pasados?',
          answer: 'Actualmente solo puedes marcar los hábitos de hoy. La capacidad de marcar días pasados se agregará en futuras actualizaciones.'
        },
        {
          category: 'statistics',
          question: '¿Cómo se calculan las estadísticas?',
          answer: 'La tasa de éxito muestra el porcentaje de finalización en los últimos 30 días. Las finalizaciones totales muestran cuántas veces completaste el hábito, y la racha más larga muestra tu período de finalización más largo sin interrupciones.'
        },
        {
          category: 'statistics',
          question: '¿Cómo veo mis estadísticas?',
          answer: 'Haga clic en la pestaña "Estadísticas" del menú inferior. Aquí puede ver estadísticas detalladas de todos sus hábitos.'
        },
        {
          category: 'premium',
          question: '¿Qué es la membresía premium?',
          answer: 'Con la membresía premium, puede agregar hábitos ilimitados, disfrutar de una experiencia sin anuncios, acceder a estadísticas avanzadas y usar la función de respaldo de datos.'
        },
        {
          category: 'premium',
          question: '¿Cómo obtener la membresía premium?',
          answer: 'Haga clic en Configuración → Estado Premium o el banner Premium en la página de inicio. Puede comprar eligiendo entre opciones de plan mensual o anual.'
        },
        {
          category: 'premium',
          question: '¿Puedo cancelar la membresía premium?',
          answer: 'Sí, puede cancelar su membresía premium en cualquier momento. Después de la cancelación, continuará disfrutando de las funciones premium hasta el final del período actual.'
        },
        {
          category: 'data',
          question: '¿Están seguros mis datos?',
          answer: 'Sí, todos sus datos se almacenan localmente en su dispositivo (IndexedDB). No se envían datos a nuestros servidores. Solo usted puede acceder a sus datos.'
        },
        {
          category: 'data',
          question: '¿Puedo hacer una copia de seguridad de mis datos?',
          answer: '¡Sí! Puede guardar todos sus datos como un archivo JSON con la opción Configuración → Gestión de Datos → Exportar Datos. Mantenga este archivo en un lugar seguro.'
        },
        {
          category: 'data',
          question: '¿Perderé mis datos si cambio de teléfono?',
          answer: 'Sí, dado que los datos se almacenan localmente, se perderán cuando cambie de dispositivo. Sin embargo, puede hacer una copia de seguridad usando la función de exportación e importar en su nuevo dispositivo.'
        },
        {
          category: 'technical',
          question: '¿En qué navegadores funciona?',
          answer: 'Funciona sin problemas en todos los navegadores modernos como Chrome, Firefox, Safari, Edge. Se recomiendan versiones actualizadas del navegador para la mejor experiencia.'
        },
        {
          category: 'technical',
          question: '¿Funciona sin conexión?',
          answer: 'Sí, gracias a la tecnología PWA (Progressive Web App), puede usarlo sin conexión a Internet. Cuando lo agregas a la pantalla de inicio, funciona como una aplicación.'
        },
        {
          category: 'technical',
          question: '¿Cómo habilito las notificaciones?',
          answer: 'Puede habilitar las notificaciones desde Configuración → Preferencias → Notificaciones. Su navegador pedirá permiso, haga clic en "Permitir".'
        }
      ],
      contact: {
        title: '¿Aún Necesitas Ayuda?',
        description: 'Si tu problema no está entre las respuestas anteriores, no dudes en contactarnos.',
        button: 'Contáctanos'
      }
    },
    fr: {
      title: 'Aide et FAQ',
      intro: {
        heading: 'Comment Pouvons-nous Vous Aider?',
        description: 'Vous pouvez trouver les questions fréquemment posées et les réponses ci-dessous. Si vous ne trouvez pas votre problème, contactez-nous.'
      },
      quickLinks: {
        email: {
          title: 'Support Email',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Confidentialité',
          description: 'Notre politique de confidentialité'
        },
        feedback: {
          title: 'Commentaires',
          description: 'Partagez vos idées'
        }
      },
      categories: {
        gettingStarted: 'Commencer',
        habits: 'Habitudes',
        statistics: 'Statistiques',
        premium: 'Premium',
        data: 'Données',
        technical: 'Technique'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: 'Comment utiliser le Suivi des Habitudes?',
          answer: 'Cliquez sur le bouton "+" sur la page d\'accueil pour ajouter une nouvelle habitude. Choisissez un nom, une description, une couleur et une icône pour votre habitude. Cliquez ensuite sur le bouton de vérification sur la carte chaque jour lorsque vous terminez votre habitude.'
        },
        {
          category: 'gettingStarted',
          question: 'Combien d\'habitudes puis-je ajouter?',
          answer: 'Vous pouvez ajouter un maximum de 3 habitudes dans la version gratuite. Avec l\'adhésion premium, vous pouvez ajouter des habitudes illimitées.'
        },
        {
          category: 'habits',
          question: 'Comment modifier ou supprimer une habitude?',
          answer: 'Cliquez sur la carte d\'habitude pour accéder à la page de modification. De là, vous pouvez modifier votre habitude ou la supprimer en cliquant sur le bouton "Supprimer l\'habitude".'
        },
        {
          category: 'habits',
          question: 'Qu\'est-ce qu\'une série?',
          answer: 'Une série montre combien de jours consécutifs vous avez terminé une habitude. Par exemple, si vous terminez votre habitude de lecture pendant 7 jours consécutifs, votre série sera de 7. Si vous manquez un jour, la série se réinitialise.'
        },
        {
          category: 'habits',
          question: 'Puis-je ajouter des habitudes pour les jours passés?',
          answer: 'Actuellement, vous ne pouvez marquer que les habitudes d\'aujourd\'hui. La possibilité de marquer les jours passés sera ajoutée dans les mises à jour futures.'
        },
        {
          category: 'statistics',
          question: 'Comment les statistiques sont-elles calculées?',
          answer: 'Le taux de réussite montre le pourcentage d\'achèvement au cours des 30 derniers jours. Les achèvements totaux montrent combien de fois vous avez terminé l\'habitude, et la série la plus longue montre votre période d\'achèvement la plus longue sans interruption.'
        },
        {
          category: 'statistics',
          question: 'Comment afficher mes statistiques?',
          answer: 'Cliquez sur l\'onglet "Statistiques" du menu inférieur. Ici, vous pouvez voir des statistiques détaillées de toutes vos habitudes.'
        },
        {
          category: 'premium',
          question: 'Qu\'est-ce que l\'adhésion premium?',
          answer: 'Avec l\'adhésion premium, vous pouvez ajouter des habitudes illimitées, profiter d\'une expérience sans publicité, accéder à des statistiques avancées et utiliser la fonction de sauvegarde des données.'
        },
        {
          category: 'premium',
          question: 'Comment obtenir l\'adhésion premium?',
          answer: 'Cliquez sur Paramètres → Statut Premium ou la bannière Premium sur la page d\'accueil. Vous pouvez acheter en choisissant parmi les options de plan mensuel ou annuel.'
        },
        {
          category: 'premium',
          question: 'Puis-je annuler l\'adhésion premium?',
          answer: 'Oui, vous pouvez annuler votre adhésion premium à tout moment. Après l\'annulation, vous continuerez à profiter des fonctionnalités premium jusqu\'à la fin de la période actuelle.'
        },
        {
          category: 'data',
          question: 'Mes données sont-elles en sécurité?',
          answer: 'Oui, toutes vos données sont stockées localement sur votre appareil (IndexedDB). Aucune donnée n\'est envoyée à nos serveurs. Vous seul pouvez accéder à vos données.'
        },
        {
          category: 'data',
          question: 'Puis-je sauvegarder mes données?',
          answer: 'Oui! Vous pouvez enregistrer toutes vos données sous forme de fichier JSON avec l\'option Paramètres → Gestion des Données → Exporter les Données. Conservez ce fichier dans un endroit sûr.'
        },
        {
          category: 'data',
          question: 'Vais-je perdre mes données si je change de téléphone?',
          answer: 'Oui, étant donné que les données sont stockées localement, elles seront perdues lorsque vous changerez d\'appareil. Cependant, vous pouvez sauvegarder en utilisant la fonction d\'exportation et importer sur votre nouvel appareil.'
        },
        {
          category: 'technical',
          question: 'Sur quels navigateurs fonctionne-t-il?',
          answer: 'Il fonctionne de manière transparente sur tous les navigateurs modernes comme Chrome, Firefox, Safari, Edge. Les versions de navigateur mises à jour sont recommandées pour la meilleure expérience.'
        },
        {
          category: 'technical',
          question: 'Fonctionne-t-il hors ligne?',
          answer: 'Oui, grâce à la technologie PWA (Progressive Web App), vous pouvez l\'utiliser sans connexion Internet. Lorsque vous l\'ajoutez à l\'écran d\'accueil, il fonctionne comme une application.'
        },
        {
          category: 'technical',
          question: 'Comment activer les notifications?',
          answer: 'Vous pouvez activer les notifications depuis Paramètres → Préférences → Notifications. Votre navigateur demandera l\'autorisation, cliquez sur "Autoriser".'
        }
      ],
      contact: {
        title: 'Besoin d\'Aide?',
        description: 'Si votre problème ne figure pas parmi les réponses ci-dessus, n\'hésitez pas à nous contacter.',
        button: 'Contactez-nous'
      }
    },
    de: {
      title: 'Hilfe & FAQ',
      intro: {
        heading: 'Wie Können Wir Ihnen Helfen?',
        description: 'Sie können unten häufig gestellte Fragen und Antworten finden. Wenn Sie Ihr Problem nicht finden, kontaktieren Sie uns.'
      },
      quickLinks: {
        email: {
          title: 'E-Mail-Support',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Datenschutz',
          description: 'Unsere Datenschutzrichtlinie'
        },
        feedback: {
          title: 'Feedback',
          description: 'Teilen Sie Ihre Ideen'
        }
      },
      categories: {
        gettingStarted: 'Erste Schritte',
        habits: 'Gewohnheiten',
        statistics: 'Statistiken',
        premium: 'Premium',
        data: 'Daten',
        technical: 'Technisch'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: 'Wie benutzt man den Gewohnheits-Tracker?',
          answer: 'Klicken Sie auf der Startseite auf die Schaltfläche "+", um eine neue Gewohnheit hinzuzufügen. Wählen Sie einen Namen, eine Beschreibung, eine Farbe und ein Symbol für Ihre Gewohnheit. Klicken Sie dann jeden Tag auf die Schaltfläche "Überprüfen" auf der Karte, wenn Sie Ihre Gewohnheit abschließen.'
        },
        {
          category: 'gettingStarted',
          question: 'Wie viele Gewohnheiten kann ich hinzufügen?',
          answer: 'Sie können in der kostenlosen Version maximal 3 Gewohnheiten hinzufügen. Mit der Premium-Mitgliedschaft können Sie unbegrenzt Gewohnheiten hinzufügen.'
        },
        {
          category: 'habits',
          question: 'Wie bearbeitet oder löscht man eine Gewohnheit?',
          answer: 'Klicken Sie auf die Gewohnheitskarte, um zur Bearbeitungsseite zu gelangen. Von dort aus können Sie Ihre Gewohnheit bearbeiten oder löschen, indem Sie auf die Schaltfläche "Gewohnheit löschen" klicken.'
        },
        {
          category: 'habits',
          question: 'Was ist eine Strähne?',
          answer: 'Eine Strähne zeigt, wie viele Tage hintereinander Sie eine Gewohnheit abgeschlossen haben. Wenn Sie beispielsweise Ihre Lesegewohnheit 7 aufeinanderfolgende Tage lang abschließen, beträgt Ihre Strähne 7. Wenn Sie einen Tag verpassen, wird die Strähne zurückgesetzt.'
        },
        {
          category: 'habits',
          question: 'Kann ich Gewohnheiten für vergangene Tage hinzufügen?',
          answer: 'Derzeit können Sie nur die heutigen Gewohnheiten markieren. Die Möglichkeit, vergangene Tage zu markieren, wird in zukünftigen Updates hinzugefügt.'
        },
        {
          category: 'statistics',
          question: 'Wie werden Statistiken berechnet?',
          answer: 'Die Erfolgsrate zeigt den Abschlussprozentsatz in den letzten 30 Tagen. Die Gesamtabschlüsse zeigen, wie oft Sie die Gewohnheit abgeschlossen haben, und die längste Strähne zeigt Ihren längsten ununterbrochenen Abschlusszeitraum.'
        },
        {
          category: 'statistics',
          question: 'Wie sehe ich meine Statistiken?',
          answer: 'Klicken Sie im unteren Menü auf die Registerkarte "Statistiken". Hier können Sie detaillierte Statistiken aller Ihrer Gewohnheiten sehen.'
        },
        {
          category: 'premium',
          question: 'Was ist eine Premium-Mitgliedschaft?',
          answer: 'Mit der Premium-Mitgliedschaft können Sie unbegrenzt Gewohnheiten hinzufügen, eine werbefreie Erfahrung genießen, auf erweiterte Statistiken zugreifen und die Datensicherungsfunktion verwenden.'
        },
        {
          category: 'premium',
          question: 'Wie bekomme ich eine Premium-Mitgliedschaft?',
          answer: 'Klicken Sie auf Einstellungen → Premium-Status oder das Premium-Banner auf der Startseite. Sie können kaufen, indem Sie aus monatlichen oder jährlichen Planoptionen wählen.'
        },
        {
          category: 'premium',
          question: 'Kann ich die Premium-Mitgliedschaft kündigen?',
          answer: 'Ja, Sie können Ihre Premium-Mitgliedschaft jederzeit kündigen. Nach der Kündigung genießen Sie Premium-Funktionen bis zum Ende der aktuellen Periode weiter.'
        },
        {
          category: 'data',
          question: 'Sind meine Daten sicher?',
          answer: 'Ja, alle Ihre Daten werden lokal auf Ihrem Gerät (IndexedDB) gespeichert. Es werden keine Daten an unsere Server gesendet. Nur Sie können auf Ihre Daten zugreifen.'
        },
        {
          category: 'data',
          question: 'Kann ich meine Daten sichern?',
          answer: 'Ja! Sie können alle Ihre Daten als JSON-Datei mit der Option Einstellungen → Datenverwaltung → Daten exportieren speichern. Bewahren Sie diese Datei an einem sicheren Ort auf.'
        },
        {
          category: 'data',
          question: 'Verliere ich meine Daten, wenn ich das Telefon wechsle?',
          answer: 'Ja, da die Daten lokal gespeichert werden, gehen sie verloren, wenn Sie das Gerät wechseln. Sie können jedoch mit der Exportfunktion sichern und auf Ihrem neuen Gerät importieren.'
        },
        {
          category: 'technical',
          question: 'In welchen Browsern funktioniert es?',
          answer: 'Es funktioniert nahtlos in allen modernen Browsern wie Chrome, Firefox, Safari, Edge. Aktualisierte Browserversionen werden für die beste Erfahrung empfohlen.'
        },
        {
          category: 'technical',
          question: 'Funktioniert es offline?',
          answer: 'Ja, dank PWA-Technologie (Progressive Web App) können Sie es ohne Internetverbindung verwenden. Wenn Sie es zum Startbildschirm hinzufügen, funktioniert es wie eine App.'
        },
        {
          category: 'technical',
          question: 'Wie aktiviere ich Benachrichtigungen?',
          answer: 'Sie können Benachrichtigungen von Einstellungen → Einstellungen → Benachrichtigungen aktivieren. Ihr Browser wird um Erlaubnis bitten, klicken Sie auf "Zulassen".'
        }
      ],
      contact: {
        title: 'Noch Hilfe Benötigt?',
        description: 'Wenn Ihr Problem nicht unter den obigen Antworten ist, kontaktieren Sie uns gerne.',
        button: 'Kontaktieren Sie uns'
      }
    },
    it: {
      title: 'Aiuto e FAQ',
      intro: {
        heading: 'Come Possiamo Aiutarti?',
        description: 'Puoi trovare le domande frequenti e le risposte di seguito. Se non riesci a trovare il tuo problema, contattaci.'
      },
      quickLinks: {
        email: {
          title: 'Supporto Email',
          description: 'support@habitracker.com'
        },
        privacy: {
          title: 'Privacy',
          description: 'La nostra politica sulla privacy'
        },
        feedback: {
          title: 'Feedback',
          description: 'Condividi le tue idee'
        }
      },
      categories: {
        gettingStarted: 'Iniziare',
        habits: 'Abitudini',
        statistics: 'Statistiche',
        premium: 'Premium',
        data: 'Dati',
        technical: 'Tecnico'
      },
      faqs: [
        {
          category: 'gettingStarted',
          question: 'Come usare il Tracciatore di Abitudini?',
          answer: 'Fai clic sul pulsante "+" nella home page per aggiungere una nuova abitudine. Scegli un nome, una descrizione, un colore e un\'icona per la tua abitudine. Quindi fai clic sul pulsante di controllo sulla scheda ogni giorno quando completi la tua abitudine.'
        },
        {
          category: 'gettingStarted',
          question: 'Quante abitudini posso aggiungere?',
          answer: 'Puoi aggiungere un massimo di 3 abitudini nella versione gratuita. Con l\'abbonamento premium, puoi aggiungere abitudini illimitate.'
        },
        {
          category: 'habits',
          question: 'Come modificare o eliminare un\'abitudine?',
          answer: 'Fai clic sulla scheda dell\'abitudine per andare alla pagina di modifica. Da lì puoi modificare la tua abitudine o eliminarla facendo clic sul pulsante "Elimina abitudine".'
        },
        {
          category: 'habits',
          question: 'Cos\'è una serie?',
          answer: 'Una serie mostra quanti giorni consecutivi hai completato un\'abitudine. Ad esempio, se completi la tua abitudine di lettura per 7 giorni consecutivi, la tua serie sarà 7. Se perdi un giorno, la serie si azzera.'
        },
        {
          category: 'habits',
          question: 'Posso aggiungere abitudini per i giorni passati?',
          answer: 'Attualmente puoi solo contrassegnare le abitudini di oggi. La possibilità di contrassegnare i giorni passati verrà aggiunta in futuri aggiornamenti.'
        },
        {
          category: 'statistics',
          question: 'Come vengono calcolate le statistiche?',
          answer: 'Il tasso di successo mostra la percentuale di completamento negli ultimi 30 giorni. I completamenti totali mostrano quante volte hai completato l\'abitudine e la serie più lunga mostra il tuo periodo di completamento più lungo senza interruzioni.'
        },
        {
          category: 'statistics',
          question: 'Come visualizzo le mie statistiche?',
          answer: 'Fai clic sulla scheda "Statistiche" dal menu inferiore. Qui puoi vedere statistiche dettagliate di tutte le tue abitudini.'
        },
        {
          category: 'premium',
          question: 'Cos\'è l\'abbonamento premium?',
          answer: 'Con l\'abbonamento premium, puoi aggiungere abitudini illimitate, goderti un\'esperienza senza pubblicità, accedere a statistiche avanzate e utilizzare la funzione di backup dei dati.'
        },
        {
          category: 'premium',
          question: 'Come ottenere l\'abbonamento premium?',
          answer: 'Fai clic su Impostazioni → Stato Premium o il banner Premium nella home page. Puoi acquistare scegliendo tra le opzioni di piano mensile o annuale.'
        },
        {
          category: 'premium',
          question: 'Posso annullare l\'abbonamento premium?',
          answer: 'Sì, puoi annullare il tuo abbonamento premium in qualsiasi momento. Dopo l\'annullamento, continuerai a goderti le funzionalità premium fino alla fine del periodo corrente.'
        },
        {
          category: 'data',
          question: 'I miei dati sono sicuri?',
          answer: 'Sì, tutti i tuoi dati sono archiviati localmente sul tuo dispositivo (IndexedDB). Nessun dato viene inviato ai nostri server. Solo tu puoi accedere ai tuoi dati.'
        },
        {
          category: 'data',
          question: 'Posso fare un backup dei miei dati?',
          answer: 'Sì! Puoi salvare tutti i tuoi dati come file JSON con l\'opzione Impostazioni → Gestione Dati → Esporta Dati. Conserva questo file in un luogo sicuro.'
        },
        {
          category: 'data',
          question: 'Perderò i miei dati se cambio telefono?',
          answer: 'Sì, poiché i dati sono archiviati localmente, andranno persi quando cambierai dispositivo. Tuttavia, puoi fare un backup utilizzando la funzione di esportazione e importare sul tuo nuovo dispositivo.'
        },
        {
          category: 'technical',
          question: 'Su quali browser funziona?',
          answer: 'Funziona perfettamente su tutti i browser moderni come Chrome, Firefox, Safari, Edge. Le versioni aggiornate del browser sono consigliate per la migliore esperienza.'
        },
        {
          category: 'technical',
          question: 'Funziona offline?',
          answer: 'Sì, grazie alla tecnologia PWA (Progressive Web App), puoi usarlo senza connessione Internet. Quando lo aggiungi alla schermata home, funziona come un\'app.'
        },
        {
          category: 'technical',
          question: 'Come attivo le notifiche?',
          answer: 'Puoi attivare le notifiche da Impostazioni → Preferenze → Notifiche. Il tuo browser chiederà il permesso, fai clic su "Consenti".'
        }
      ],
      contact: {
        title: 'Hai Ancora Bisogno di Aiuto?',
        description: 'Se il tuo problema non è tra le risposte sopra, non esitare a contattarci.',
        button: 'Contattaci'
      }
    }
  };

  const pageContent = content[language] || content.tr;
  const faqs = pageContent.faqs;
  const categories = Object.entries(pageContent.categories);

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
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border-2 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {pageContent.intro.heading}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {pageContent.intro.description}
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="mailto:support@habitracker.com"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#C85A3E] dark:hover:border-[#C85A3E] transition-all"
          >
            <Mail size={28} className="text-[#C85A3E] mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{pageContent.quickLinks.email.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{pageContent.quickLinks.email.description}</p>
          </a>
          <button
            onClick={() => navigate('/privacy')}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#C85A3E] dark:hover:border-[#C85A3E] transition-all text-left"
          >
            <BookOpen size={28} className="text-[#C85A3E] mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{pageContent.quickLinks.privacy.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{pageContent.quickLinks.privacy.description}</p>
          </button>
          <a
            href="mailto:support@habitracker.com?subject=Feedback"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#C85A3E] dark:hover:border-[#C85A3E] transition-all block"
          >
            <MessageCircle size={28} className="text-[#C85A3E] mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{pageContent.quickLinks.feedback.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{pageContent.quickLinks.feedback.description}</p>
          </a>
        </div>

        {/* FAQ by Category */}
        {categories.map(([categoryKey, categoryName], catIndex) => (
          <div key={catIndex} className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <span className="text-primary-500">●</span>
              <span>{categoryName}</span>
            </h3>
            <div className="space-y-2">
              {faqs
                .filter(faq => faq.category === categoryKey)
                .map((faq) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={globalIndex} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{pageContent.contact.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {pageContent.contact.description}
          </p>
          <a
            href="mailto:support@habitracker.com"
            className="inline-flex items-center space-x-2 bg-[#C85A3E] hover:bg-[#B34F35] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Mail size={20} />
            <span>{pageContent.contact.button}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
