'use client';

import React from 'react';
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';

type SectionProps = Readonly<{
  id: string;
  title: string;
  children: React.ReactNode;
}>;

function Section({ id, title, children }: SectionProps) {
  return (
    <Stack component="section" spacing={1.5} id={id}>
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

export default function CookiePolicy() {
  const theme = useTheme<Theme>();
  const linkSx = {
    textDecoration: 'none',
    color: theme.palette.uranoGreen1.main,
    overflowWrap: 'anywhere' as const,
  };

  const lastUpdated = '20 April 2025';

  return (
    <Stack
      direction="column"
      minHeight="100dvh"
      width="100%"
      sx={{ bgcolor: theme.palette.background.default }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1120,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
          pt: { xs: 16, sm: 4, md: 20 },
          pb: { xs: 3, sm: 4, md: 6 },
          flex: 1,
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack sx={{ p: { xs: 0, md: 4 } }} spacing={2}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 1 }}>
              Cookie Policy
            </Typography>

            <Typography variant="body1" gutterBottom>
              Last updated: {lastUpdated}
            </Typography>

            <Divider sx={{ my: 2, borderColor: theme.palette.secondary.main }} />

            <Section id="introduction" title="Introduction">
              <Typography variant="body1" paragraph>
                This Cookie Policy describes the use of cookies and similar technologies on the website{' '}
                <Link
                  href="https://www.uranoecosystem.com/"
                  target="_blank"
                  rel="noopener"
                  sx={linkSx}
                >
                  https://www.uranoecosystem.com/
                </Link>{' '}
                and its related submodules (the “Website”), operated by Urano Ecosystem Sp. z o.o.
                (“Urano Ecosystem” or the “Company”).
              </Typography>

              <Typography variant="body1" paragraph>
                The use of cookies complies with Regulation (EU) 2016/679 (GDPR), the ePrivacy Directive
                (2002/58/EC as amended), and applicable national legislation.
              </Typography>

              <Typography variant="body1" paragraph>
                References to MiCA do not apply to cookie usage, as the MiCA Regulation concerns crypto-asset
                services and does not regulate tracking technologies. Where relevant, information obligations
                related to crypto-asset modules will be addressed in the specific documentation accompanying
                those services.
              </Typography>

              <Typography variant="body1" paragraph>
                The processing of personal data through cookies is based on the user’s consent, except for
                strictly necessary cookies, which are required to ensure the Website’s technical functionality
                and essential operations.
              </Typography>
            </Section>

            <Section id="types-and-purposes" title="Types of Cookies Used and Purposes">
              <Typography variant="body1" paragraph>
                Urano Ecosystem uses the Cookiebot service to manage cookie consent and ensure compliance with
                applicable data protection regulations, including Regulation (EU) 2016/679 (GDPR) and the
                ePrivacy Directive (Directive 2002/58/EC, as amended).
              </Typography>

              <Typography variant="body1" paragraph>
                At present, the Website uses only strictly necessary (essential) cookies, which are required
                to ensure the proper technical functioning of the platform and the provision of core services.
                No profiling, marketing, analytics, or non-essential cookies are used.
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ fontWeight: 700 }}>
                Essential Cookies
              </Typography>

              <Typography variant="body1" paragraph>
                Essential cookies are necessary for the operation of the Website and enable basic
                functionalities such as page navigation, access to secure areas, and the correct management of
                user consent preferences. Without these cookies, the Website cannot function properly.
              </Typography>

              <Typography variant="body1" paragraph>
                In particular, the CookieConsent cookie is used to store the user&apos;s consent status in
                relation to the use of cookies on the domain.
              </Typography>

              <Box sx={{ mt: 1 }}>
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <Table size="small" aria-label="cookie table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Cookie Name</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Provider</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Purpose</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>CookieConsent</TableCell>
                        <TableCell>uranoecosystem.com</TableCell>
                        <TableCell>HTTP</TableCell>
                        <TableCell>1 year</TableCell>
                        <TableCell>Stores the user&apos;s cookie consent state for the domain</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                These cookies do not collect personal data for profiling or marketing purposes and do not
                require the user&apos;s prior consent, as they are strictly necessary for the provision of the
                Website and compliance with applicable regulations.
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ fontWeight: 700, mt: 1 }}>
                Specifications Regarding Potential Additional Cookies
              </Typography>

              <Typography variant="body1" paragraph>
                Should Urano Ecosystem decide, in the future, to introduce additional categories of cookies
                beyond strictly necessary ones, in order to enhance user experience or for limited analytical
                or functional purposes, users will be duly informed in advance through an update of this
                Cookie Policy and, where required, through the cookie consent management banner.
              </Typography>

              <Typography variant="body1" paragraph>
                In such case, the types of cookies that may be implemented include:
              </Typography>

              <Bullets
                items={[
                  <Typography variant="body1" key="pc">
                    <strong>Performance Cookies:</strong> These cookies may collect aggregated and anonymous
                    information regarding the use of the Website (such as pages visited or technical
                    performance metrics), with the sole purpose of improving the performance and usability of
                    the platform.
                  </Typography>,
                  <Typography variant="body1" key="fc">
                    <strong>Functional Cookies:</strong> These cookies may allow the Website to remember user
                    choices and preferences (such as language or display settings), in order to provide a more
                    personalized and consistent browsing experience.
                  </Typography>,
                  <Typography variant="body1" key="ac">
                    <strong>Analytical Cookies:</strong> These cookies may be used to collect information
                    about user interactions with the Website for statistical and aggregated analysis purposes
                    only, without direct identification of individual users.
                  </Typography>,
                  <Typography variant="body1" key="tmc">
                    <strong>Tracking and Marketing Cookies:</strong> These cookies may be used to monitor user
                    browsing behavior across the Website in order to deliver tailored content or
                    communications. Such cookies will not be activated without the user’s explicit and
                    informed consent, in accordance with applicable data protection and ePrivacy regulations.
                  </Typography>,
                ]}
              />

              <Typography variant="body1" gutterBottom sx={{ fontWeight: 700, mt: 1 }}>
                Technologies Similar to Cookies
              </Typography>

              <Typography variant="body1" paragraph>
                Urano Ecosystem may also use technologies similar to cookies, such as tracking pixels or web
                beacons, solely to monitor aggregated interactions with the Website and improve its services,
                subject to the same consent and transparency requirements applicable to cookies.
              </Typography>

              <Typography variant="body1" paragraph>
                Any changes regarding the categories or purposes of cookies used will be communicated through
                an updated version of this Cookie Policy and reflected within the cookie consent management
                interface, in full compliance with applicable legal provisions.
              </Typography>
            </Section>

            <Section id="third-party-cookies" title="Third-Party Cookies">
              <Typography variant="body1" paragraph>
                At present, the Website does not use third-party cookies.
              </Typography>

              <Typography variant="body1" paragraph>
                However, certain third-party cookies may be integrated in the future if Urano Ecosystem
                decides to enable external services or functionalities on the Website. Such services may
                include, by way of example:
              </Typography>

              <Bullets
                items={[
                  'Google Analytics (traffic and usage analysis)',
                  'YouTube (embedded video content)',
                  'Facebook Pixel (conversion tracking and marketing analytics)',
                  'Google Maps (interactive map integration)',
                ]}
              />

              <Typography variant="body1" paragraph>
                Any third-party cookies will be installed only where strictly necessary and, where required by
                applicable law, only after the user has provided explicit and informed consent through the
                cookie consent management banner.
              </Typography>

              <Typography variant="body1" paragraph>
                These cookies are subject to the respective privacy and cookie policies of the third-party
                providers, which operate as independent data controllers. Urano Ecosystem does not control
                such cookies and encourages users to review the policies of the relevant providers for further
                information on data processing practices.
              </Typography>

              <Typography variant="body1" paragraph>
                Should third-party cookies be activated in the future, this Cookie Policy will be updated
                accordingly, and users will be informed in advance in compliance with applicable data
                protection and ePrivacy regulations.
              </Typography>
            </Section>

            <Section id="managing-consent" title="Managing Cookie Consent and Preferences">
              <Typography variant="body1" paragraph>
                Users may manage their cookie preferences at any time through the following means:
              </Typography>

              <Bullets
                items={[
                  'by using the Cookiebot consent management banner, which can be activated and is always accessible from the Website;',
                  <Typography variant="body1" key="browser">
                    by modifying the settings of their web browser, in accordance with the specific
                    instructions provided by each browser provider, including:
                  </Typography>,
                ]}
              />

              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ py: 0.25 }}>
                  <Link
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener"
                    sx={linkSx}
                  >
                    Google Chrome: Cookie Settings
                  </Link>
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <Link
                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                    target="_blank"
                    rel="noopener"
                    sx={linkSx}
                  >
                    Mozilla Firefox: Manage Cookies
                  </Link>
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <Link
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener"
                    sx={linkSx}
                  >
                    Safari: Block Cookies
                  </Link>
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <Link
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener"
                    sx={linkSx}
                  >
                    Microsoft Edge: Cookie Settings
                  </Link>
                </ListItem>
              </List>

              <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                Where non-essential cookies are enabled in the future, no such cookies will be installed
                without the user’s prior, explicit, and informed consent, expressed through the consent
                management interface.
              </Typography>

              <Typography variant="body1" paragraph>
                Consent may be withdrawn or modified at any time, either through the tools made available on
                the Website or via browser settings. Such withdrawal shall not affect the lawfulness of any
                processing carried out prior to the withdrawal, in accordance with applicable data protection
                regulations.
              </Typography>
            </Section>

            <Section id="sharing" title="Sharing of Data Collected Through Cookies">
              <Typography variant="body1" paragraph>
                Any data collected through cookies may be shared with carefully selected third-party service
                providers (such as hosting providers, technical service providers, or consent management
                platforms), solely for the purposes described in this Cookie Policy and on the basis of
                appropriate contractual and technical safeguards.
              </Typography>

              <Typography variant="body1" paragraph>
                Where applicable, such third parties operate either as data processors acting on behalf of
                Urano Ecosystem or as independent data controllers, in accordance with their respective roles
                and responsibilities under applicable data protection laws.
              </Typography>

              <Typography variant="body1" paragraph>
                Any transfer of personal data to third parties or to third countries shall take place in
                compliance with Articles 44–49 of Regulation (EU) 2016/679 (GDPR), including the adoption of
                appropriate safeguards such as adequacy decisions, Standard Contractual Clauses (SCCs), or
                other lawful transfer mechanisms.
              </Typography>
            </Section>

            <Section id="transfers" title="Transfer of Data Outside the European Economic Area (EEA)">
              <Typography variant="body1" paragraph>
                Some technical cookies used by the Website, such as the CookieConsent cookie managed through
                the Cookiebot platform, may involve the transfer of limited personal data outside the European
                Economic Area (EEA).
              </Typography>

              <Typography variant="body1" paragraph>
                At present, data processed through such cookies is transferred to Ireland, a country for which
                the European Commission has adopted an adequacy decision pursuant to Article 45 of the GDPR,
                thereby ensuring an adequate level of data protection.
              </Typography>

              <Typography variant="body1" paragraph>
                Should Urano Ecosystem decide, in the future, to integrate cookies or similar technologies
                managed by providers established outside the EEA, all necessary measures will be implemented
                to ensure an adequate level of protection for personal data. Such measures may include, where
                required:
              </Typography>

              <Bullets
                items={[
                  'the application of Standard Contractual Clauses (SCCs) adopted by the European Commission pursuant to Article 46 GDPR;',
                  'the adoption of Binding Corporate Rules (BCRs) or other appropriate safeguards in accordance with Articles 44–49 GDPR;',
                  'adherence to European Data Protection Board (EDPB) guidelines on international data transfers.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Users may request additional information regarding international data transfers and the
                safeguards adopted by contacting{' '}
                <Link href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </Link>{' '}
                or the designated Data Protection Officer (DPO) at{' '}
                <Link href="mailto:dpo@uranoecosystem.com" sx={linkSx}>
                  dpo@uranoecosystem.com
                </Link>
                .
              </Typography>
            </Section>

            <Section id="security" title="Security and Technical Measures">
              <Typography variant="body1" paragraph>
                Urano Ecosystem implements appropriate technical and organizational measures to ensure the
                confidentiality, integrity, and availability of data processed through cookies, in accordance
                with Article 32 of Regulation (EU) 2016/679 (GDPR).
              </Typography>

              <Typography variant="body1" paragraph>
                Such measures include, inter alia, access controls, secure infrastructure, and the limitation
                of data processing to what is strictly necessary for the purposes described in this Cookie
                Policy. Any third-party providers involved in cookie management or related technical services
                are carefully selected and contractually bound to comply with applicable data protection
                obligations.
              </Typography>
            </Section>

            <Section id="updates" title="Updates to the Cookie Policy">
              <Typography variant="body1" paragraph>
                Urano Ecosystem reserves the right to update or amend this Cookie Policy at any time, in
                particular in the event of:
              </Typography>

              <Bullets
                items={[
                  'the introduction of new cookies or tracking technologies;',
                  'changes to the Website’s functionalities;',
                  'updates to applicable laws, regulations, or supervisory authority guidance.',
                ]}
              />

              <Typography variant="body1" paragraph>
                Any updated version of this Cookie Policy will be made available on the Website. Where
                required by law, material changes will be communicated to users through the cookie consent
                banner or other appropriate notification mechanisms.
              </Typography>
            </Section>

            <Section id="response-times" title="Response Times and User Request Management">
              <Typography variant="body1" paragraph>
                In accordance with Regulation (EU) 2016/679 (GDPR), Urano Ecosystem undertakes to respond to
                user requests concerning the exercise of their data protection rights—including access,
                rectification, erasure, restriction, objection, data portability, or withdrawal of consent—
                within 30 days from receipt of the request.
              </Typography>

              <Typography variant="body1" paragraph>
                This period may be extended by up to 60 additional days in cases of particular complexity or a
                high volume of requests. In such cases, users will be informed of the extension and the
                reasons for it within the initial response period.
              </Typography>

              <Typography variant="body1" paragraph>
                For any request or further information, users may contact{' '}
                <Link href="mailto:info@uranoecosystem.com" sx={linkSx}>
                  info@uranoecosystem.com
                </Link>{' '}
                or the designated Data Protection Officer (DPO) at{' '}
                <Link href="mailto:dpo@uranoecosystem.com" sx={linkSx}>
                  dpo@uranoecosystem.com
                </Link>
                .
              </Typography>

              <Typography variant="body1" paragraph>
                For more detailed information on the processing of personal data, users are invited to
                consult the full Privacy Policy, available in the footer of the Website or at:{' '}
                <Link
                  href="https://www.uranoecosystem.com/privacy-policy"
                  target="_blank"
                  rel="noopener"
                  sx={linkSx}
                >
                  https://www.uranoecosystem.com/privacy-policy
                </Link>
                .
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
