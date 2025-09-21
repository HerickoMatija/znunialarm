import clsx from 'clsx'
import { Metadata } from 'next'

type TosItem = {
  title?: string | null
  sections: TosItemSection[]
}

type TosItemSection = {
  title?: string | null
  content: TosItemContent[]
}

type TosItemContent = {
  type: 'paragraph' | 'list'
  text?: string
  texts?: string[]
  noDots?: boolean
}

const items: TosItem[] = [
  {
    sections: [
      {
        content: [{ type: 'paragraph', text: 'Willkommen bei YumAlarm ("wir", "unser" oder "uns"), einem Software as a Service (SaaS) Angebot von Devflection software, Inhaber Matija Hericko ("Devflection"). Durch den Zugriff auf oder die Nutzung unserer Dienste stimmen Sie den folgenden Nutzungsbedingungen zu. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, nutzen Sie bitte unsere Plattform nicht.' }],
      },
    ],
  },
  {
    title: '1. Geltungsbereich',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Diese Nutzungsbedingungen ("AGB") regeln die vertraglichen Rahmenbedingungen zwischen Devflection und einem Vertragspartner von Devflection ("Kunde") im Zusammenhang mit der Bereitstellung von Software zur Nutzung über das Internet (Software-as-a-Service).' },
          { type: 'paragraph', text: 'Der Kunde erkennt die jeweils gültige Fassung der AGB von Devflection als integralen Bestandteil aller bestehenden und/oder zukünftigen vertraglichen Vereinbarungen zwischen dem Kunden und Devflection im Zusammenhang mit der Bereitstellung von Software zur Nutzung über das Internet an. Sie gelten auch unabhängig davon, ob ausdrücklich darauf Bezug genommen wird oder nicht.' },
          { type: 'paragraph', text: 'Eine detaillierte Beschreibung der von Devflection zu erbringenden Leistungen ergibt sich aus dem jeweiligen Abonnement ("Benutzerplan").' },
          { type: 'paragraph', text: 'Etwaige Abweichungen und/oder Ergänzungen zu diesen AGB bedürfen zu ihrer Gültigkeit der ausdrücklichen schriftlichen Zustimmung von Devflection. Solche abweichenden Vereinbarungen gelten nur für die Vereinbarung, die die abweichende Vereinbarung enthält und haben keine präjudizielle Wirkung für andere Vereinbarungen zwischen den Vertragsparteien.' },
          { type: 'paragraph', text: 'Etwaigen Allgemeinen Geschäftsbedingungen des Kunden wird hiermit ausdrücklich widersprochen. Ihre Anwendung auf das Vertragsverhältnis zwischen Devflection und dem Kunden ist ausgeschlossen.' },
        ],
      },
    ],
  },
  {
    title: '2. Von Devflection erbrachte Dienstleistungen',
    sections: [
      {
        title: '2.1 Nutzungsrecht',
        content: [
          { type: 'paragraph', text: 'Devflection stellt dem Kunden das im Benutzerplan benannte und beschriebene Softwareprodukt ("Software") zur Nutzung über das Internet ("Service") zur Verfügung. Der Kunde ist nicht zu weiteren mit der Software verbundenen Rechten berechtigt, wie Eigentum, Urheberrecht, Patent, Marken- oder Nutzungsrechte.' },
          { type: 'paragraph', text: 'Die Software wird auf Computern eines von Devflection genutzten Rechenzentrums betrieben. Für die Dauer dieser Vereinbarung wird dem Kunden das nicht-exklusive und nicht-übertragbare Recht eingeräumt, mittels eines Browsers und einer Internetverbindung auf die Software zuzugreifen und diese für seine eigenen Zwecke und Aktivitäten zu nutzen. Der Kunde ist für die Internetverbindung zwischen dem Kunden und dem Rechenzentrum sowie die dafür erforderliche Hard- und Software (z.B. PC, Netzwerkverbindung, Browser) verantwortlich.' },
          { type: 'paragraph', text: 'Das Nutzungsrecht ist auf die vom Kunden gemäß dem jeweiligen Benutzerplan gebuchte Anzahl von Nutzungseinheiten beschränkt. Eine Unterlizenzierung oder Weiterlizenzierung der Software ist untersagt. Der Kunde hat kein Recht auf eine Kopie und damit auch kein Recht auf eine Sicherungskopie der Software. Alle Rechte an der Software oder dem Service über das in diesen AGB definierte Nutzungsrecht hinaus verbleiben vollständig bei Devflection.' },
        ],
      },
      {
        title: '2.2 Einschränkungen',
        content: [
          { type: 'paragraph', text: 'Sie stimmen zu, Folgendes zu unterlassen:' },
          {
            type: 'list',
            texts: [
              'Nutzung unserer Plattform für rechtswidrige Zwecke oder unter Verstoß gegen diese Nutzungsbedingungen',
              'Störung oder Unterbrechung des Betriebs unserer Plattform oder ihrer Server',
              'Beteiligung an betrügerischen oder irreführenden Aktivitäten',
              'Versuch, unbefugten Zugriff auf unsere Plattform oder Konten anderer Benutzer zu erlangen',
              'Reverse Engineering oder anderweitige Versuche, den Quellcode, Objektcode oder die zugrundeliegende Struktur, Ideen, Know-how oder Algorithmen im Zusammenhang mit den Diensten oder jeglicher damit verbundener Software, Dokumentation oder Daten zu entdecken',
            ],
          },
        ],
      },
      {
        title: '2.3 Betrieb',
        content: [
          { type: 'paragraph', text: 'Devflection trifft geeignete Maßnahmen, um dem Kunden eine möglichst störungsfreie Nutzung des Service zu ermöglichen. Devflection kann keine Verfügbarkeit des Service zu jeder Zeit und Freiheit von sonstigen Störungen und Unterbrechungen der Funktionsfähigkeit garantieren.' },
          { type: 'paragraph', text: 'Der Kunde hat Devflection Störungen des Service unverzüglich anzuzeigen und Informationen über die Einzelheiten der Umstände des Problems zu geben. Devflection wird die Störung des Service innerhalb angemessener Frist beheben. Devflection ist berechtigt, die Störung des Service durch eine Umgehungslösung zu umgehen, wenn die Ursache der Störung selbst nur mit unangemessenem Aufwand zu beseitigen ist und die Nutzbarkeit des Service nicht erheblich beeinträchtigt wird.' },
        ],
      },
      {
        title: '2.4 Support',
        content: [
          { type: 'paragraph', text: 'Zur Unterstützung der Nutzung der Software als Service stellt Devflection Online-Support zur Verfügung. Der Support umfasst nicht: allgemeinen Know-how-Transfer, Schulungen, Konfigurationsimplementierung oder kundenspezifische Dokumentation oder Modifikation der Software.' },
          {
            type: 'paragraph',
            text: 'Der Support erfolgt per E-Mail an <a href="mailto:support@yumalarm.com">support@yumalarm.com</a>. Devflection erbringt die Supportleistungen während der Arbeitszeit von Montag bis Freitag zwischen 8.30 und 17.00 Uhr MEZ. Gesetzliche Feiertage sind ausgenommen. Außerhalb dieser Supportzeiten eingehende Anfragen gelten als am folgenden Arbeitstag eingegangen.',
          },
        ],
      },
      {
        title: '2.5 Änderungen der Dienstleistungen',
        content: [
          { type: 'paragraph', text: 'Devflection kann die Software (Service, einschließlich ihrer Systemanforderungen) zum Zwecke der Anpassung an technische oder kommerzielle Marktveränderungen und aus wichtigem Grund ändern. Ein solcher liegt insbesondere vor, wenn die Änderung erforderlich ist aufgrund' },
          {
            type: 'list',
            texts: [
              'einer notwendigen Anpassung an eine neue Rechtslage oder Rechtsprechung',
              'geänderter technischer Rahmenbedingungen (neue Browserversionen technischer Standards)',
              'des Schutzes der Systemsicherheit',
              'der Weiterentwicklung der Software (Abschaltung alter Funktionen, die weitgehend durch neue ersetzt werden)',
            ],
          },
        ],
      },
    ],
  },
  {
    title: '3 Einbezug Dritter',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Devflection ist berechtigt, zur Erfüllung ihrer vertraglichen Verpflichtungen Dritte einzubeziehen. Dies gilt insbesondere für Hosting-Dienste.' },
          { type: 'paragraph', text: 'Devflection übernimmt keine Haftung für die Dienstleistungen einbezogener Dritter, soweit dies gesetzlich zulässig ist.' },
        ],
      },
    ],
  },
  {
    title: '4 Vergütung und Zahlungsbedingungen',
    sections: [
      {
        title: '4.1 Gebührenstruktur',
        content: [{ type: 'paragraph', text: 'Für die Nutzung der Software während der Vertragslaufzeit schuldet der Kunde Devflection die Lizenzgebühren gemäß dem jeweiligen Benutzerplan.' }],
      },
      {
        title: '4.2 Zahlung, Upgrade und Downgrade',
        content: [
          { type: 'paragraph', text: 'Kunden mit einem kostenpflichtigen Benutzerplan werden über Stripe als Zahlungsanbieter abgerechnet. Dem Kunden wird der erste Monat nach Ablauf der Testphase in Rechnung gestellt. Der Service für die Grundperiode von einem Monat wird im Voraus in Rechnung gestellt. Wenn der Kunde den Vertrag nicht ordentlich oder außerordentlich gemäß Ziffer 9.2 kündigt, wird der Service für die Verlängerungsperiode am Ende des monatlichen Abrechnungszyklus im Voraus in Rechnung gestellt und ist nicht erstattungsfähig. Es erfolgen keine Rückerstattungen oder Gutschriften für teilweise Monate der Dienstleistung.' },
          { type: 'paragraph', text: 'Der Kunde kann jederzeit ein Upgrade oder Downgrade vornehmen. Bei einem Upgrade des Planlevels wird dem Kunden die Differenz der Tarife sofort in Rechnung gestellt und der neue Tarif im nächsten Abrechnungszyklus. Bei einem Downgrade des Planlevels erhält der Kunde Gutschriften in Höhe der Differenz zwischen den Tarifen und wird dann im nächsten Abrechnungszyklus mit dem neuen Tarif belastet. Ein Downgrade des Service kann zum Verlust von Inhalten, Funktionen oder Kapazitäten führen.' },
        ],
      },
      {
        title: '4.3 Nettopreise',
        content: [{ type: 'paragraph', text: 'Alle Preise verstehen sich zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer (Schweiz: Mehrwertsteuer). Der Kunde ist für eventuell anfallende Umsatzsteuern verantwortlich.' }],
      },
      {
        title: '4.4 Maßnahmen bei Zahlungsverzug',
        content: [{ type: 'paragraph', text: 'Gerät der Kunde mit der Zahlung von Gebühren in Verzug, ist Devflection berechtigt, den Zugang zum Service zu sperren oder das Vertragsverhältnis außerordentlich zu kündigen. Der Kunde hat während der Sperrung keinen Zugriff auf die von ihm im Service gespeicherten Daten. Im Falle einer Kündigung gilt Ziffer 9.2.' }],
      },
    ],
  },
  {
    title: '5 Kundendaten, Datenschutz und Referenzen',
    sections: [
      {
        title: '5.1 Einreichung von Inhalten',
        content: [
          {
            type: 'paragraph',
            text: 'Bei der Nutzung unserer Plattform haben Sie möglicherweise die Gelegenheit, Inhalte wie Ernährungspräferenzen und Feedback einzureichen. Sie behalten alle Eigentumsrechte an Ihren Inhalten, gewähren uns jedoch eine nicht-exklusive, weltweite, gebührenfreie und übertragbare Lizenz zur Nutzung, Speicherung und Anzeige Ihrer Inhalte im Zusammenhang mit unseren Diensten.',
          },
        ],
      },
      {
        title: '5.2 Verbotene Inhalte',
        content: [{ type: 'paragraph', text: 'Sie verpflichten sich, keine Inhalte einzureichen, die illegal, schädlich, beleidigend oder rechtsverletzend sind oder die Rechte anderer verletzen. Wir behalten uns das Recht vor, Inhalte zu entfernen, die wir als unangemessen oder als Verstoß gegen diese Nutzungsbedingungen erachten.' }],
      },
      {
        title: '5.3 Kundendaten (Geistige Eigentumsrechte)',
        content: [
          {
            type: 'paragraph',
            text: 'Der Kunde ist ausschließlich berechtigt an den Daten, die im Rahmen der Nutzung der Software eingegeben, dadurch generiert und dem Kunden und den Endnutzern des Kunden zuordenbar sind ("Kundendaten").',
          },
          {
            type: 'paragraph',
            text: 'Der Kunde besitzt alle Rechte, Titel und Ansprüche an den Kundendaten sowie an allen Daten, die auf den Kundendaten basieren oder davon abgeleitet sind und dem Kunden im Rahmen der Dienstleistungen zur Verfügung gestellt werden.',
          },
          {
            type: 'paragraph',
            text: 'Devflection behält alle Rechte, Titel und Ansprüche an (a) den Dienstleistungen und der Software, allen Verbesserungen, Erweiterungen oder Änderungen daran, (b) jeglicher Software, Anwendungen, Erfindungen oder anderen Technologien, die im Zusammenhang mit Implementierungsdienstleistungen oder Support entwickelt wurden, und (c) allen geistigen Eigentumsrechten im Zusammenhang mit dem Vorstehenden.',
          },
          {
            type: 'paragraph',
            text: 'Die Bestimmungen dieses Abschnitts bleiben auch nach Beendigung dieser Vereinbarung bestehen.',
          },
        ],
      },
      {
        title: '5.4 Datenschutz',
        content: [
          { type: 'paragraph', text: 'Dem Kunden ist bewusst, dass die Nutzung und Verarbeitung personenbezogener Daten im Sinne der geltenden in- und/oder ausländischen Datenschutzgesetzgebung, insbesondere und soweit anwendbar der EU-Datenschutz-Grundverordnung ("EU-DSGVO") und des Schweizerischen Datenschutzgesetzes ("DSG"), die vorherige Einwilligung der betroffenen Personen und/oder die Registrierung der entsprechenden Datenbank bei einer in- oder ausländischen Behörde erfordern kann. Devflection ist, soweit anwendbar, vollständig konform mit den Vorschriften der EU-DSGVO und des DSG.' },
          { type: 'paragraph', text: 'Wenn YumAlarm als Auftragsverarbeiter tätig ist, verarbeitet YumAlarm die Kundendaten ausschließlich im Auftrag und/oder nach den Weisungen des Kunden. Die verarbeiteten Daten werden zur Bereitstellung der Software verwendet und gemäß der Datenschutzerklärung von YumAlarm (yumalarm.com/privacy-policy) behandelt. Der Kunde bleibt für die Rechtmäßigkeit der Erhebung, Verarbeitung und Nutzung der Kundendaten gemäß den geltenden gesetzlichen Bestimmungen, insbesondere nach EU-DSGVO und DSG, verantwortlich.' },
          { type: 'paragraph', text: 'Wenn YumAlarm als Verantwortlicher tätig ist, verarbeitet YumAlarm die Kundendaten zur Bereitstellung der Software und die verarbeiteten Daten werden gemäß der Datenschutzerklärung von YumAlarm (yumalarm.com/privacy-policy) behandelt.' },
        ],
      },
      {
        title: '5.5 Datenaufbewahrung',
        content: [{ type: 'paragraph', text: 'Devflection wird Kundendaten für einen Zeitraum von zwei Monaten nach Ablauf eines Abonnements aufbewahren.' }],
      },
      {
        title: '5.5 Löschung von Benutzerdaten',
        content: [{ type: 'paragraph', text: 'Nach Ablauf der zweimonatigen Aufbewahrungsfrist behält sich Devflection das Recht vor, alle auf ihren Servern gespeicherten Kundendaten zu löschen. Die Löschung der Kundendaten erfolgt gemäß den geltenden gesetzlichen und regulatorischen Anforderungen, einschließlich zwingender Aufbewahrungspflichten.' }],
      },
    ],
  },
  {
    title: '6 Freistellung',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Der Kunde stellt Devflection und einbezogene Dritte von allen Ansprüchen Dritter frei, die sich aus (a) der rechtswidrigen Nutzung der Software durch den Kunden und/oder mit Zustimmung des Kunden durch Dritte, (b) aus Streitigkeiten aus Datenschutzgesetzen, Urheberrechtsgesetzen oder anderen Rechtsstreitigkeiten im Zusammenhang mit der Nutzung der Software durch den Kunden ergeben können.' },
          { type: 'paragraph', text: 'Der Kunde erklärt sich hiermit einverstanden, Devflection gegen alle Schäden, Verluste, Verbindlichkeiten, Vergleiche und Ausgaben (einschließlich, aber nicht beschränkt auf Kosten und Anwaltsgebühren) im Zusammenhang mit jeglichen Ansprüchen oder Klagen, die sich aus einer angeblichen Verletzung des Vorstehenden oder anderweitig aus der Nutzung der Dienste durch den Kunden ergeben, zu entschädigen und schadlos zu halten.' },
          { type: 'paragraph', text: 'Bei der Geltendmachung entsprechender Ansprüche ist der Kunde verpflichtet, Devflection unverzüglich schriftlich darüber zu informieren. In diesem Fall ist Devflection berechtigt, den Service für den Kunden unverzüglich und ohne Nachfrist zu sperren. Ein etwaiger Schadenersatzanspruch des Kunden aufgrund der Sperrung des Service ist ausgeschlossen.' },
        ],
      },
    ],
  },
  {
    title: '7 Haftung',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Devflection übernimmt keinerlei Haftung, soweit gesetzlich zulässig, insbesondere für' },
          {
            type: 'list',
            texts: [
              'Schäden, die aus der Verletzung der vertraglichen Verpflichtungen des Kunden entstehen',
              'Schäden, die durch von Devflection einbezogene Dritte oder Hilfspersonen verursacht werden',
              'Schäden aufgrund von Viren',
              'Schäden infolge von bösartigem Code',
              'Schäden infolge eines Hackerangriffs',
              'Schäden infolge eines Softwarefehlers',
              'Schäden infolge eines Fehlers im Betriebssystem, Betriebsstörungen aufgrund von Fehlerbehebung, Wartung, Infrastrukturänderungen, Einführung neuer Technologien',
              'Schäden infolge eines fehlerhaften Service-Packs eines anderen Herstellers',
              'Schäden infolge von Datenverlusten',
              'indirekte oder Folgeschäden wie entgangener Gewinn, nicht realisierte Einsparungen oder Ansprüche Dritter',
            ],
          },
        ],
      },
    ],
  },
  {
    title: '8 Keine Garantien',
    sections: [
      {
        content: [{ type: 'paragraph', text: 'Sofern in dieser Vereinbarung nicht anders dargestellt, werden die Software und der Service von Devflection "wie besehen" zur Verfügung gestellt. Über die in dieser Vereinbarung enthaltenen Bestimmungen hinaus gibt Devflection keine weiteren ausdrücklichen oder stillschweigenden Garantien und lehnt hiermit alle stillschweigenden Garantien ab, einschließlich jeglicher Garantie der Marktgängigkeit und Eignung für einen bestimmten Zweck.' }],
      },
    ],
  },
  {
    title: '9 Laufzeit und Kündigung',
    sections: [
      {
        title: '9.1 Laufzeit',
        content: [
          { type: 'paragraph', text: 'Der Benutzerplan wird für eine bestimmte Laufzeit (monatlich) je nach Bestellung des Kunden ("Grundperiode") abgeschlossen und verlängert sich danach automatisch um die gleiche Periode ("Verlängerungsperiode"), wenn das Vertragsverhältnis nicht gemäß nachstehender Ziffer 9.2 von einer der Vertragsparteien ordentlich oder außerordentlich gekündigt wird.' },
          { type: 'paragraph', text: 'Die Bestimmungen der Ziffer 9.2 gelten wie vorstehend auch für eine Reduzierung der Nutzungseinheiten während der Laufzeit.' },
        ],
      },
      {
        title: '9.2 Kündigung',
        content: [
          { type: 'paragraph', text: 'a) Ordentliche Kündigung: Das Vertragsverhältnis kann von jeder der Vertragsparteien zum Ende der Grundperiode oder einer Verlängerungsperiode gekündigt werden.' },
          { type: 'paragraph', text: 'b) Außerordentliche Kündigung: Devflection kann das Vertragsverhältnis aus wichtigem Grund jederzeit und mit sofortiger Wirkung außerordentlich kündigen. Ein wichtiger Grund, der Devflection zur außerordentlichen Kündigung berechtigt, liegt insbesondere vor:' },
          {
            type: 'list',
            texts: [
              'wenn der Kunde seine vertraglichen Verpflichtungen verletzt, soweit dieser Mangel vom Kunden trotz vorheriger schriftlicher Abmahnung durch Devflection nicht innerhalb von 10 Tagen behoben wurde oder nicht behoben werden kann',
              'wenn der Kunde mit der Zahlung von Gebühren in Verzug gerät',
              'wenn über das Vermögen des Kunden ein Insolvenzverfahren eröffnet wird',
            ],
          },
        ],
      },
      {
        title: '9.3 Kundendaten nach Beendigung',
        content: [
          {
            type: 'paragraph',
            text: 'Am Ende des Vertragsverhältnisses und auf schriftliche Anfrage des Kunden stellt Devflection eine Kopie der zum Zeitpunkt des Vertragsendes auf ihren Servern gespeicherten Kundendaten auf einem üblichen Datenträger oder durch elektronische Übertragung und in einem üblichen Format zur Verfügung.',
          },
          {
            type: 'paragraph',
            text: 'Nach Ablauf von 60 Tagen ab Ende des Vertragsverhältnisses oder auf Wunsch des Kunden bereits vor dieser Frist löscht Devflection die auf ihren Servern gespeicherten Daten des Kunden endgültig und vollständig. Diese Maßnahme unterliegt zwingenden gesetzlichen Aufbewahrungspflichten.',
          },
          {
            type: 'paragraph',
            text: 'Devflection ist nicht verpflichtet, ihre Daten abweichend von diesen Bestimmungen (insbesondere bezüglich Zeit, Format oder Migration) an den Kunden herauszugeben. Eine abweichende Herausgabe der Kundendaten bedarf der vorherigen schriftlichen Zustimmung von Devflection sowie einer gesonderten Vergütung durch den Kunden.',
          },
        ],
      },
    ],
  },
  {
    title: '10 Vertraulichkeit',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Die Vertragspartner verpflichten sich und ihre Mitarbeiter sowie einbezogene Hilfspersonen gegenseitig zur Geheimhaltung aller nicht allgemein bekannten Unterlagen und Informationen, die sich auf die geschäftliche Sphäre des anderen Vertragspartners beziehen und die ihnen bei der Vorbereitung und Durchführung dieses Vertragsverhältnisses zugänglich werden.' },
          { type: 'paragraph', text: 'Die Geheimhaltungspflicht besteht auch nach Beendigung des Vertragsverhältnisses fort, soweit daran ein berechtigtes Interesse besteht.' },
        ],
      },
    ],
  },
  {
    title: '11 Schlussbestimmungen',
    sections: [
      {
        title: '11.1 Änderungen dieser AGB',
        content: [{ type: 'paragraph', text: 'Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Alle Änderungen treten mit der Veröffentlichung der aktualisierten Bedingungen auf unserer Plattform in Kraft. Ihre fortgesetzte Nutzung unserer Plattform nach solchen Änderungen stellt Ihre Zustimmung zu den geänderten Nutzungsbedingungen dar. Devflection wird den Kunden über alle Änderungen dieser AGB informieren.' }],
      },
      {
        title: '11.2 Aufrechnung und Abtretung von Ansprüchen',
        content: [
          { type: 'paragraph', text: 'Die Aufrechnung von Forderungen von Devflection gegen Gegenforderungen des Kunden bedarf der vorherigen schriftlichen Zustimmung von Devflection.' },
          { type: 'paragraph', text: 'Der Kunde ist nicht berechtigt, Ansprüche aus dem Vertragsverhältnis mit Devflection ganz oder teilweise an Dritte abzutreten, auch nicht an Konzern- oder Tochtergesellschaften.' },
        ],
      },
      {
        title: '11.3 Erfüllungsort',
        content: [{ type: 'paragraph', text: 'Erfüllungsort ist der Sitz von Devflection.' }],
      },
      {
        title: '11.4 Salvatorische Klausel',
        content: [{ type: 'paragraph', text: 'Sollten einzelne Bestimmungen dieser AGB unwirksam oder unvollständig sein oder sollte die Erfüllung unmöglich sein, so wird dadurch die Wirksamkeit der übrigen Bestimmungen dieser AGB nicht berührt. Unwirksame Bestimmungen sind durch eine zulässige, wirksame Regelung zu ersetzen, die dem Inhalt des Originals in ihrer Absicht möglichst nahe kommt.' }],
      },
      {
        title: '11.5 Datum des Vertragsabschlusses',
        content: [
          {
            type: 'paragraph',
            text: 'Der Vertrag gilt als abgeschlossen durch den Erhalt einer Bestätigungs-E-Mail nach der Anmeldung.',
          },
        ],
      },
    ],
  },
  {
    title: '12 Anwendbares Recht und Gerichtsstand',
    sections: [
      {
        content: [
          { type: 'paragraph', text: 'Die Vertragsbeziehung zwischen Devflection und dem Kunden, einschließlich des Benutzerplans und seiner Anhänge, unterliegt dem Schweizer Recht, außerdem ausgenommen von allen nationalen oder internationalen Verträgen oder Vereinbarungen, die zum Zeitpunkt der Inkraftsetzung rechtlich gültig sind oder ein Streitfall (z.B. Vereinbarung der Vereinten Nationen über Verträge für den internationalen Verkauf von Waren (CISG) oder das Hamburger Abkommen über Erwerbungen).' },
          { type: 'paragraph', text: 'Im Falle von Meinungsverschiedenheiten im Zusammenhang mit der Vertragsbeziehung verpflichten sich die Vertragsparteien, nach Treu und Glauben eine einvernehmliche Regelung zu finden. Wenn trotz der Bemühungen der Vertragsparteien keine gütliche Einigung erzielt werden kann, ist der Gerichtsstand für alle Streitigkeiten, Meinungsverschiedenheiten oder Ansprüche aus oder im Zusammenhang mit der Vertragsbeziehung zwischen Devflection und dem Kunden, einschließlich des Benutzerplans und seiner Anhänge, einschließlich deren Gültigkeit, Ungültigkeit, Verletzung oder Auflösung, der Sitz von Devflection. Ungeachtet dessen ist Devflection berechtigt, den Kunden an seinem allgemeinen Gerichtsstand zu verklagen.' },
        ],
      },
    ],
  },
]


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nutzungsbedingungen',
  }
}

export default async function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl text-base leading-7">
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Nutzungsbedingungen</h1>
      <p className="text-base font-semibold leading-7">Version: August 2023</p>
      {items.map((item, index) => {
        return renderItem(item, index.toString())
      })}
    </div>
  )
}

function renderItem(item: TosItem, key: string) {
  return (
    <div key={key}>
      {item.title && <h2 className="mt-6 text-2xl font-bold tracking-tight">{item.title}</h2>}
      {item.sections.map((section, index) => {
        return renderSection(section, key + '-' + index)
      })}
    </div>
  )
}

function renderSection(section: TosItemSection, key: string) {
  return (
    <div key={key}>
      {section.title && <h3 className="mt-6 text-xl font-bold tracking-tight">{section.title}</h3>}
      {section.content.map((content, index) => {
        return renderContent(content, index, key + '-' + index)
      })}
    </div>
  )
}

function renderContent(content: TosItemContent, idx: number, key: string) {
  if (content.type === 'list') {
    return (
      <ul className={clsx('ml-4 mt-2 space-y-4', content.noDots ? '' : 'list-disc')} key={key}>
        {content.texts?.map((listText, index) => {
          return (
            <li className="gap-x-3" key={key + '-' + index}>
              <span>{listText}</span>
            </li>
          )
        })}
      </ul>
    )
  } else {
    if (idx === 0) {
      return (
        <p className="mt-6 leading-8" key={key}>
          {content.text}
        </p>
      )
    } else {
      return (
        <p className="mt-2 leading-8" key={key}>
          {content.text}
        </p>
      )
    }
  }
}
