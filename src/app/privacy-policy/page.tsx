'use client';

import React from 'react';
import {
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';

type SectionProps = Readonly<{
  id: string;
  title: string;
  children: React.ReactNode;
}>;

function Section({ id, title, children }: SectionProps) {
  return (
    <Stack component="section" spacing={1.5} id={id} sx={{ scrollMarginTop: 96 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

type BulletsProps = Readonly<{
  items: readonly React.ReactNode[];
}>;

function Bullets({ items }: BulletsProps) {
  return (
    <List dense sx={{ pl: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
      {items.map((node, idx) => (
        <ListItem key={idx} sx={{ py: 0.25 }}>
          {typeof node === 'string' ? <Typography variant="body1">{node}</Typography> : node}
        </ListItem>
      ))}
    </List>
  );
}

export default function PrivacyPolicy() {
  const theme = useTheme<Theme>();

  const brandGreen = theme.palette.uranoGreen1?.main ?? theme.palette.primary.main;

  const linkSx = {
    textDecoration: 'none',
    color: brandGreen,
    overflowWrap: 'anywhere' as const,
  };

  const lastUpdated = 'April 20, 2025';

  return (
    <Stack direction="column" minHeight="100dvh" width="100%" px={{ xs: 0, lg: 6 }} py={{ xs: 0, lg: 3 }}>
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 0, lg: 0 },
        }}
      >
        <Stack sx={{ p: { xs: 3, md: 9 } }} justifyContent="flex-start" gap={{ xs: 2, lg: 4 }}>
          <Stack sx={{ p: { xs: 0, md: 4 } }} spacing={2}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 1 }}>
              Privacy Policy
            </Typography>

            <Typography variant="body1" gutterBottom>
              Last updated: {lastUpdated}
            </Typography>

            <Typography variant="body1" paragraph>
              Urano Ecosystem Sp. z o.o. (hereinafter referred to as “Urano Ecosystem” or the
              “Company”), in its capacity as Data Controller, is committed to protecting the
              privacy of users who access the website{' '}
              <MuiLink href="https://www.uranoecosystem.com/" target="_blank" rel="noopener" sx={linkSx}>
                https://www.uranoecosystem.com/
              </MuiLink>{' '}
              (including its related submodules and interfaces, hereinafter the “Website”).
            </Typography>

            <Typography variant="body1" paragraph>
              This Privacy Policy describes the methods and purposes of processing personal data
              in accordance with Regulation (EU) 2016/679 (GDPR), applicable national legislation,
              Regulation (EU) 2023/1114 (MiCA), and best European and international practices on
              security, anti-money laundering, and data protection.
            </Typography>

            <Divider sx={{ my: 2, borderColor: theme.palette.secondary.main }} />

            <Section id="data-controller" title="Data Controller">
              <Bullets
                items={[
                  'Urano Ecosystem Sp. z o.o.',
                  'Registered office: ul. Mickiewicza 39A/3, 86-300 Grudziądz, Poland',
                  <>
                    <Typography variant="body1">
                      Contact email:{' '}
                      <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                        info@uranoecosystem.com
                      </MuiLink>
                    </Typography>
                  </>,
                  <>
                    <Typography variant="body1">
                      DPO contact:{' '}
                      <MuiLink href="mailto:dpo@uranoecosystem.com" sx={linkSx}>
                        dpo@uranoecosystem.com
                      </MuiLink>
                    </Typography>
                  </>,
                ]}
              />
            </Section>

            <Section id="categories" title="Categories of Data Processed">
              <Typography variant="body1" paragraph>
                The Website may process personal data either automatically during navigation or as
                voluntarily provided by the User.
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                A. Data collected automatically during navigation
              </Typography>

              <Bullets
                items={[
                  'Browsing data: IP address, device identifiers, browser type, operating system, date and time of access, pages visited.',
                  <>
                    <Typography variant="body1">
                      Technical data collected via cookies, as specified in the Cookie Policy:{' '}
                      <MuiLink
                        href="https://www.uranoecosystem.com/cookie-policy"
                        target="_blank"
                        rel="noopener"
                        sx={linkSx}
                      >
                        https://www.uranoecosystem.com/cookie-policy
                      </MuiLink>
                    </Typography>
                  </>,
                ]}
              />

              <Typography variant="body1" paragraph>
                Such data are used exclusively for security, technical, statistical, and operational
                purposes, in accordance with the principles of minimization and proportionality
                under the GDPR.
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                B. Data directly provided by the User
              </Typography>

              <Bullets
                items={[
                  'Identification and contact data: name, surname, email address submitted through forms, Typeform, Google Forms or similar tools.',
                  'Identification and documentary data: processed for identity verification or access to services, including data collected for AML/KYC obligations under Regulation (EU) 2023/1114 (MiCA), Directive (EU) 2015/849 (AMLD), subsequent amendments, and Regulation (EU) 2023/1113 (TFR).',
                  'Web3 ecosystem data: such as Telegram username, wallet address, unique identifiers, or token-linked references associated with a user profile.',
                  'Biometric data: processed only with explicit consent and solely for advanced authentication or specific security measures.',
                ]}
              />

              <Typography variant="body1" paragraph>
                The collected data are processed exclusively for the purposes described in this
                Privacy Policy or in dedicated notices relating to individual services, modules, or
                functionalities that may be integrated in the future.
              </Typography>

              <Typography variant="body1" paragraph>
                Any expansion of the processing scope will be accompanied by updated documentation
                in compliance with GDPR and sector regulations.
              </Typography>
            </Section>

            <Section id="identity-verification" title="Processing for Identity Verification and AML/KYC">
              <Typography variant="body1" paragraph>
                For identity verification, AML/CFT activities, and compliance flows, Urano Ecosystem
                may:
              </Typography>

              <Bullets
                items={[
                  'process data directly through trained internal personnel,',
                  'engage its Data Protection Officer (DPO),',
                  'rely on specialized external providers appointed as Data Processors under Article 28 GDPR.',
                ]}
              />

              <Typography variant="body1" paragraph>
                These operations may be carried out through digital platforms, dedicated modules,
                APIs, or integrated verification tools on the Website or approved third-party
                portals.
              </Typography>

              <Typography variant="body1" paragraph>
                All external processors operate in full compliance with GDPR, AML directives,
                Regulation (EU) 2023/1114 (MiCA), Regulation (EU) 2023/1113 (TFR), and applicable
                technical and organizational security measures to ensure lawful and secure
                processing.
              </Typography>
            </Section>

            <Section id="purposes-legal-bases" title="Purposes and Legal Bases of Processing">
              <Typography variant="body1" paragraph>
                Personal data are processed by Urano Ecosystem for the following purposes, in
                accordance with the principles of lawfulness, transparency, and data minimization
                established by the GDPR:
              </Typography>

              <Bullets
                items={[
                  <Typography variant="body1" key="p1">
                    • To provide and manage current and future services made available through the
                    Website, including onboarding procedures, access management, identity
                    verification where applicable, and interaction with Web3-related tools or
                    modules. <strong>Legal basis:</strong> performance of pre-contractual and
                    contractual measures (Art. 6(1)(b) GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p2">
                    • To enable Website navigation and ensure its correct technical and
                    infrastructural functioning, including security, stability, and optimization of
                    the browsing experience. <strong>Legal basis:</strong> legitimate interest of
                    the Controller (Art. 6(1)(f) GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p3">
                    • To respond to requests submitted via contact forms, institutional email
                    addresses, or other official communication channels. <strong>Legal basis:</strong>{' '}
                    performance of pre-contractual measures (Art. 6(1)(b) GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p4">
                    • To ensure cybersecurity, prevent fraud, detect misuse, and protect the
                    integrity of the Website and any future integrated digital services.{' '}
                    <strong>Legal basis:</strong> legitimate interest of the Controller (Art.
                    6(1)(f) GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p5">
                    • To comply with legal obligations, including tax requirements, anti-money
                    laundering (AML/CFT), regulation of fund and crypto-asset transfers (TFR),
                    personal data protection (GDPR), and obligations arising from Regulation (EU)
                    2023/1114 (MiCA). <strong>Legal basis:</strong> legal obligation (Art. 6(1)(c)
                    GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p6">
                    • To perform identity verification and customer due diligence (KYC/AML) via
                    dedicated forms, platforms or connected APIs, as required under European and
                    Polish legislation. <strong>Legal basis:</strong> legal obligation (Art. 6(1)(c)
                    GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p7">
                    • To carry out statistical analyses and improve Website functionality, including
                    the use of anonymized tracking tools and technical or analytical cookies.{' '}
                    <strong>Legal basis:</strong> legitimate interest (Art. 6(1)(f) GDPR).
                  </Typography>,
                  <Typography variant="body1" key="p8">
                    • To send marketing communications, promotional content or personalized
                    newsletters via email or other electronic channels, where such activities are
                    made available. <strong>Legal basis:</strong> user consent (Art. 6(1)(a) GDPR).
                  </Typography>,
                ]}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                Withdrawal of Consent
              </Typography>

              <Typography variant="body1" paragraph>
                Any consent provided for marketing, promotional communications or analytical purposes
                may be withdrawn at any time without affecting the lawfulness of processing prior to
                withdrawal, pursuant to Article 7(3) GDPR.
              </Typography>

              <Typography variant="body1" paragraph>
                Users may withdraw consent by:
              </Typography>

              <Bullets
                items={[
                  'using the opt-out mechanisms provided within the relevant service or communication tools;',
                  <>
                    <Typography variant="body1">
                      adjusting cookie preferences via the banner or by following the instructions
                      in the Cookie Policy:{' '}
                      <MuiLink
                        href="https://www.uranoecosystem.com/cookie-policy"
                        target="_blank"
                        rel="noopener"
                        sx={linkSx}
                      >
                        https://www.uranoecosystem.com/cookie-policy
                      </MuiLink>
                      ;
                    </Typography>
                  </>,
                  <>
                    <Typography variant="body1">
                      contacting{' '}
                      <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                        info@uranoecosystem.com
                      </MuiLink>{' '}
                      or, where applicable, the Data Protection Officer (DPO), using the contact
                      details published in the official Website documentation.
                    </Typography>
                  </>,
                ]}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                Clarification on Current Website Functions
              </Typography>

              <Typography variant="body1" paragraph>
                The purposes listed represent the full range of processing activities that Urano
                Ecosystem may undertake as its modules and services evolve over time. At present,
                the Website performs informational functions, and not all of the above processing
                activities are active.
              </Typography>

              <Typography variant="body1" paragraph>
                Urano Ecosystem reserves the right to activate additional processing purposes in
                compliance with applicable regulations, subject to the publication of dedicated
                privacy notices for each new integrated service and, where required, prior
                collection of the User’s explicit consent.
              </Typography>
            </Section>

            <Section id="methods" title="Methods of Processing">
              <Typography variant="body1" paragraph>
                The processing of personal data by Urano Ecosystem is carried out in full compliance
                with the principles established in Articles 5 and 32 of Regulation (EU) 2016/679
                (GDPR), using manual and/or electronic tools and adopting appropriate technical and
                organizational measures.
              </Typography>

              <Typography variant="body1" paragraph>
                These measures aim to ensure:
              </Typography>

              <Bullets
                items={[
                  <Typography variant="body1" key="m1">
                    <strong>Confidentiality:</strong> preventing unauthorized access or disclosure;
                  </Typography>,
                  <Typography variant="body1" key="m2">
                    <strong>Integrity:</strong> protecting information from alteration, accidental
                    loss, or destruction;
                  </Typography>,
                  <Typography variant="body1" key="m3">
                    <strong>Availability:</strong> ensuring data remains accessible for the purposes
                    for which it was collected, in accordance with the principle of data
                    minimization.
                  </Typography>,
                ]}
              />

              <Typography variant="body1" paragraph>
                Urano Ecosystem implements, among others, the following security measures:
              </Typography>

              <Bullets
                items={[
                  'encryption of data transmissions, where applicable, to protect communication between the User and the platform;',
                  'access control systems, ensuring that only authorized and trained personnel may access specific data categories;',
                  'periodic security audits and vulnerability assessments;',
                  'monitoring of access logs, use of auditing systems, and protection mechanisms against malware or unauthorized access attempts;',
                  'internal policies governing data minimization, pseudonymization, and retention in accordance with necessity and proportionality.',
                ]}
              />

              <Typography variant="body1" paragraph>
                While Urano Ecosystem adopts advanced security standards, Users acknowledge that no
                online system can guarantee absolute protection.
              </Typography>

              <Typography variant="body1" paragraph>
                In the event of a suspected incident, unauthorized access, or potential data breach,
                Users are encouraged to promptly contact{' '}
                <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </MuiLink>{' '}
                or, where appointed, the Data Protection Officer (DPO), so that the procedures
                required under Articles 33 and 34 GDPR may be activated.
              </Typography>

              <Typography variant="body1" paragraph>
                Urano Ecosystem also maintains an updated Record of Processing Activities under
                Article 30 GDPR, documenting the purposes, categories of data, recipients, retention
                periods, and adopted security measures.
              </Typography>
            </Section>

            <Section id="retention" title="Data Retention">
              <Typography variant="body1" paragraph>
                Urano Ecosystem retains personal data only for the time strictly necessary to
                fulfill the purposes described in this Privacy Policy, in accordance with the
                storage limitation principle under Article 5(1)(e) GDPR.
              </Typography>

              <Typography variant="body1" paragraph>
                Retention periods vary according to the nature of the data and the applicable legal
                basis:
              </Typography>

              <Bullets
                items={[
                  'Browsing and technical data: deleted or anonymized shortly after collection, unless required for security, fraud prevention, or statistical purposes.',
                  'Data provided through forms or modules (e.g., email, Telegram username, wallet information): retained for the time required to provide the requested service or manage the interaction with the User.',
                  'Identification and documentary data collected for KYC/AML purposes: retained for at least 5 or 10 years, depending on applicable AML legislation (Directive (EU) 2015/849 and subsequent amendments, TFR Regulation).',
                  'Data processed on the basis of consent, such as marketing or analytics: retained until consent is withdrawn or, in any case, no longer than 24 months, unless specific regulations justify an extension.',
                  'Tax and accounting records: retained for the periods established by applicable legislation, including Polish law, EU regulations, and MiCA-related obligations.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Upon expiry of the applicable retention period, personal data will be securely
                deleted, anonymized, or pseudonymized so that the User can no longer be identified,
                unless longer retention is required by law.
              </Typography>

              <Typography variant="body1" paragraph>
                Urano Ecosystem periodically reviews the relevance and necessity of stored data and
                adopts appropriate measures to ensure deletion, limitation, or secure archival of
                outdated information.
              </Typography>
            </Section>

            <Section id="recipients-transfers" title="Data Recipients and International Transfers">
              <Typography variant="body1" paragraph>
                Urano Ecosystem does not sell or rent users’ personal data to third parties.
              </Typography>

              <Typography variant="body1" paragraph>
                However, personal data collected through the Website or through future digital
                services may be communicated or shared—strictly within the purposes described in
                this Privacy Policy—with the following categories of recipients:
              </Typography>

              <Bullets
                items={[
                  'Authorised personnel of Urano Ecosystem, duly trained and bound by confidentiality obligations.',
                  'Data Processors appointed under Article 28 GDPR, including: IT, hosting, cloud and security infrastructure providers; digital identity verification, KYC/AML and document archiving service providers; providers of operational or compliance platforms integrated with the Website; legal, tax, accounting or compliance consultants supporting the Company.',
                  'Public authorities, supervisory bodies or judicial authorities, whenever required by legal obligations, regulatory requests, ongoing investigations, or enforcement of AML/CFT or MiCA-related obligations.',
                  'Commercial partners or third parties, only where strictly linked to co-branded or joint initiatives, integrated services, reward programs or events, and only with the User’s explicit and informed consent, where required.',
                ]}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
                International Transfers
              </Typography>

              <Typography variant="body1" paragraph>
                Personal data may be transferred outside the European Economic Area (EEA) only when
                necessary for the operation of specific services (e.g., cloud hosting, external
                compliance tools, security infrastructures, decentralized platforms).
              </Typography>

              <Typography variant="body1" paragraph>
                Such transfers are carried out in accordance with Articles 44–49 GDPR and only where
                adequate safeguards are in place, including:
              </Typography>

              <Bullets
                items={[
                  'Adequacy decisions of the European Commission (Art. 45 GDPR);',
                  'Standard Contractual Clauses (SCCs) adopted by the Commission (Art. 46 GDPR);',
                  'Binding Corporate Rules (BCRs) or other valid mechanisms ensuring appropriate protection of personal data;',
                  'Specific derogations, where applicable and permitted under Art. 49 GDPR.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Users may request more information on the safeguards adopted or obtain a copy of the
                SCCs by contacting:{' '}
                <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </MuiLink>{' '}
                or{' '}
                <MuiLink href="mailto:dpo@uranoecosystem.com" sx={linkSx}>
                  dpo@uranoecosystem.com
                </MuiLink>
                .
              </Typography>
            </Section>

            <Section id="user-rights" title="User Rights">
              <Typography variant="body1" paragraph>
                In accordance with Regulation (EU) 2016/679 (GDPR), users have the right to exercise
                the following rights in relation to their personal data processed by Urano
                Ecosystem:
              </Typography>

              <Bullets
                items={[
                  'Right of access (Art. 15 GDPR) – to obtain confirmation of processing and receive a copy of the personal data held.',
                  'Right to rectification (Art. 16 GDPR) – to correct inaccurate or incomplete data.',
                  'Right to erasure (Art. 17 GDPR) – to request deletion of personal data, within legal limits (“right to be forgotten”).',
                  'Right to restriction of processing (Art. 18 GDPR) – to temporarily limit the processing of data under specific circumstances.',
                  'Right to data portability (Art. 20 GDPR) – to receive personal data in a structured, commonly used, machine-readable format and transmit it to another controller.',
                  'Right to object (Art. 21 GDPR) – to object to processing based on legitimate interests, unless overriding lawful grounds exist.',
                  'Right to withdraw consent (Art. 7(3) GDPR) – at any time, without affecting the lawfulness of prior processing.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Users also have the right to lodge a complaint with the competent Data Protection
                Authority, such as the Polish supervisory authority (UODO) or the authority of their
                habitual residence.
              </Typography>

              <Typography variant="body1" paragraph>
                Users may exercise their rights or request further information by contacting:{' '}
                <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </MuiLink>{' '}
                or{' '}
                <MuiLink href="mailto:dpo@uranoecosystem.com" sx={linkSx}>
                  dpo@uranoecosystem.com
                </MuiLink>
                .
              </Typography>
            </Section>

            <Section id="changes" title="Changes to the Privacy Policy">
              <Typography variant="body1" paragraph>
                Urano Ecosystem reserves the right to modify, update or supplement this Privacy
                Policy at any time in order to comply with legal or regulatory developments (e.g.,
                GDPR, MiCA, AML/CFT, TRF, ePrivacy), technological or infrastructural updates, or
                changes to the services offered or to the data processing activities carried out.
              </Typography>

              <Typography variant="body1" paragraph>
                Any update will be published on this page, together with the revision date, which
                shall constitute official notice to Users in accordance with applicable regulations.
              </Typography>

              <Typography variant="body1" paragraph>
                In the event of substantial changes that significantly affect Users’ rights or the
                conditions of data processing, Urano Ecosystem may provide additional
                notifications—such as banners, pop-ups, alerts on the Website, or email
                communications (where applicable)—in compliance with the transparency obligations
                under Regulation (EU) 2016/679 (GDPR).
              </Typography>

              <Typography variant="body1" paragraph>
                Users are encouraged to regularly review this Privacy Policy to remain informed
                about how their personal data is processed.
              </Typography>
            </Section>

            <Section id="future-services" title="Future Services and Supplementary Documentation">
              <Typography variant="body1" paragraph>
                Should Urano Ecosystem integrate new services, onboarding modules, smart contracts,
                decentralized platforms or tools that involve additional forms of data processing,
                the Company will publish specific and updated privacy documentation, including
                dedicated privacy policies and modular notices.
              </Typography>

              <Typography variant="body1" paragraph>
                Such documents will:
              </Typography>

              <Bullets
                items={[
                  'be published within the relevant interfaces or in the “Docs” section of the Website;',
                  'describe purposes, categories of data processed, legal bases and methods for exercising Users’ rights;',
                  'form an integral and binding part of the Terms and Conditions applicable to those services.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Users must review such documentation before accessing any newly introduced services.
              </Typography>

              <Typography variant="body1" paragraph>
                Urano Ecosystem ensures that personnel involved in data processing activities,
                including any appointed Data Protection Officer (DPO), operate in compliance with
                Articles 37–39 GDPR and the supervisory, security and governance obligations required
                under the MiCA Regulation.
              </Typography>
            </Section>

            <Section id="breach" title="Notification of Personal Data Breach">
              <Typography variant="body1" paragraph>
                In accordance with Articles 33 and 34 of Regulation (EU) 2016/679 (GDPR), if a
                personal data breach occurs that may pose a risk to the rights and freedoms of
                Users, Urano Ecosystem will promptly adopt the necessary measures, including:
              </Typography>

              <Bullets
                items={[
                  'immediate assessment of the incident by the Data Protection Officer (DPO) or authorised personnel;',
                  'notification of the breach to the competent Data Protection Authority (UODO in Poland) within 72 hours of becoming aware of it, unless the breach does not meet the conditions requiring notification;',
                  'communication to affected Users where the breach presents a high risk to their rights and freedoms, including information on mitigation actions taken or recommended.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Users may report suspected violations or data breaches by writing to{' '}
                <MuiLink href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </MuiLink>{' '}
                or to the DPO, where applicable, using the contact details provided on the Website.
              </Typography>
            </Section>

            <Section id="final-clause" title="Final Clause">
              <Typography variant="body1" paragraph>
                Please note that not all purposes, tools or processing activities described in this
                Privacy Policy are currently active. Should Urano Ecosystem introduce new
                functionalities, modules or services that require additional personal data
                processing, such operations will be governed by specific privacy notices, prepared
                in compliance with applicable legislation and made available in the relevant
                sections of the Website.
              </Typography>

              <Typography variant="body1" paragraph>
                With regard to cookies and tracking technologies, Users should refer to the Cookie
                Policy available in the footer of the Website. Any future introduction of new
                tracking tools, analytics services or third-party platforms will be clearly disclosed
                in the relevant documentation and, where required, will be subject to the User’s
                explicit and informed consent.
              </Typography>
            </Section>

            <Divider sx={{ my: 4, borderColor: theme.palette.secondary.main }} />

            <Typography variant="body2" color="text.secondary" align="center">
              Last updated: {lastUpdated}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
