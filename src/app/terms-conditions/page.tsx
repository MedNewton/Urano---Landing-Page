"use client";

import type { ReactElement } from "react";
import React from "react";
import {
  Box,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";

const LAST_UPDATED = "18 December 2025";

const SITE_URL = "https://www.uranoecosystem.com/";
const DOCS_URL = "https://docs.uranoecosystem.com/";
const PRIVACY_URL = "https://www.uranoecosystem.com/privacy-policy";
const COOKIE_URL = "https://www.uranoecosystem.com/cookie-policy";
const VASP_REGISTER_URL =
  "https://www.slaskie.kas.gov.pl/izba-administracji-skarbowej-w-katowicach/zalatwianie-spraw/rejestr-dzialalnosci-w-zakresie-walut-wirtualnych/-/asset_publisher/R7Yl/content/rejestr-dzialalnosci-w-zakresie-walut-wirtualnych";

function ExternalLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  const theme = useTheme<Theme>();
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      sx={{
        textDecoration: "none",
        color: theme.palette.uranoGreen1?.main ?? theme.palette.primary.main,
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </Link>
  );
}

function MailLink({
  email,
  children,
}: Readonly<{ email: string; children: React.ReactNode }>) {
  const theme = useTheme<Theme>();
  return (
    <Link
      href={`mailto:${email}`}
      sx={{
        textDecoration: "none",
        color: theme.palette.uranoGreen1?.main ?? theme.palette.primary.main,
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </Link>
  );
}

function Section({
  id,
  title,
  children,
}: Readonly<{
  id: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <Stack id={id} spacing={2} sx={{ scrollMarginTop: 96 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 0 }}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

function BulletList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <List dense sx={{ mt: 0.5 }}>
      {items.map((t) => (
        <ListItem key={t} sx={{ py: 0.35, alignItems: "flex-start" }}>
          <Typography variant="body1">{t}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default function Terms(): ReactElement {
  const theme = useTheme<Theme>();

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
          px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 3, sm: 4, md: 6 },
          flex: 1,
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack spacing={1.5}>
            <Typography variant="h3" component="h1">
              Terms &amp; Conditions – Urano Ecosystem Website
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Last updated: {LAST_UPDATED}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: theme.palette.secondary.main }} />

          <Section id="preamble" title="Preamble and Definitions">
            <Typography variant="body1" paragraph>
              This document (hereinafter the &quot;Terms&quot;) governs access
              to and use of the website available at{" "}
              <ExternalLink href={SITE_URL}>{SITE_URL}</ExternalLink> and any
              informational interface or related module connected to it
              (hereinafter the &quot;Site&quot;), owned and operated by Urano
              Ecosystem Sp. z o.o. (hereinafter &quot;Urano Ecosystem&quot; or
              &quot;Urano&quot; or the &quot;Company&quot;).
            </Typography>

            <Typography variant="body1" paragraph>
              The Site is an informational environment only and does not provide
              access to blockchain functionalities, token transactions, or
              operational modules of the Urano Ecosystem, which are accessible
              exclusively through dedicated platforms expressly designated by
              the Company.
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Definitions
            </Typography>

            <List dense sx={{ mt: 0.5 }}>
              {[
                {
                  term: "User",
                  def: "any natural or legal person who accesses, browses, consults or interacts with the Site, including without prior registration, or who engages with informational resources published by the Company.",
                },
                {
                  term: "Content",
                  def: "any information, document, text, graphic, code, image, multimedia element, software, or structured/unstructured data made available through the Site by Urano Ecosystem or authorised third parties.",
                },
                {
                  term: "Crypto-asset",
                  def: "a digital representation of value or rights that can be transferred and stored electronically using distributed ledger technology (DLT), as defined in Article 3 of Regulation (EU) 2023/1114 (MiCA).",
                },
                {
                  term: "Token",
                  def: "any crypto-asset issued or managed within the Urano Ecosystem for functional or governance purposes. Tokens do not represent ownership of underlying real-world assets, financial instruments, or revenue rights.",
                },
                {
                  term: "Tokenization",
                  def: "the process of creating structured digital representations associated with eligible real-world assets or economic models through blockchain-based tokens, for the purpose of enabling programmable, auditable and transferable interaction within decentralised infrastructures.",
                },
                {
                  term: "CASP (Crypto-Asset Service Provider)",
                  def: "an entity authorised under Regulation (EU) 2023/1114 (MiCA) to provide regulated crypto-asset services.",
                },
                {
                  term: "VASP (Virtual Asset Service Provider)",
                  def: "an entity registered under national AML frameworks to provide services relating to virtual assets pursuant to Directive (EU) 2015/849 and FATF recommendations.",
                },
                {
                  term: "Applicable Law",
                  def: "the body of European Union and Polish legislation governing the Site and future digital services, including GDPR, AML/CTF obligations, MiCA transitional provisions, consumer protection regulations and rules on digital services and blockchain technology.",
                },
              ].map((d) => (
                <ListItem
                  key={d.term}
                  sx={{ py: 0.6, alignItems: "flex-start" }}
                >
                  <Typography variant="body1">
                    <strong>{d.term}:</strong> {d.def}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Section>

          <Section
            id="consultations"
            title="Consultations and Further Information"
          >
            <Typography variant="body1" paragraph>
              For additional clarification regarding technical terminology,
              regulatory principles, or the operation of Urano Ecosystem, Users
              are encouraged to consult:
            </Typography>

            <BulletList
              items={[
                `the official technical and legal documentation of Urano Ecosystem and the FAQ section, accessible through the “Docs” section: ${DOCS_URL}`,
                "official announcements and communications issued by Urano Ecosystem.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Users should always rely solely on the official documentation
              provided by the Company for accurate, updated and authoritative
              information.
            </Typography>
          </Section>

          <Section id="about" title="1. About Us">
            <Typography variant="body1" paragraph>
              Urano Ecosystem is a Web3-native platform that provides
              infrastructure for the compliant tokenization of Real World Assets
              (RWA). Its mission is to enable secure, transparent and accessible
              interaction with eligible real-world opportunities through
              standardized digital frameworks and blockchain-based workflows.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              1.2 Legal Structure and Regulatory Compliance
            </Typography>

            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Urano Ecosystem Sp. z o.o. is incorporated in Poland as a Spółka z
              ograniczoną odpowiedzialnością (limited liability company) and is
              registered in the Polish National Court Register (KRS) under number
              0001028647, REGON 524912675, VAT/NIP 8762504246.
            </Typography>

            <Typography variant="body1" paragraph>
              The Company is listed in the Polish Register of Virtual Currency
              Activities maintained by the Fiscal Administration Chamber in
              Katowice under registration number RDWW-746, issued on 10 May 2023.
              This status qualifies Urano as a Virtual Asset Service Provider
              (VASP) under Polish law. The register is published at:{" "}
              <ExternalLink href={VASP_REGISTER_URL}>
                {VASP_REGISTER_URL}
              </ExternalLink>
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              MiCA Transitional Regime
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The Markets in Crypto-Assets Regulation (MiCA – Regulation (EU)
              2023/1114) became fully applicable on 30 December 2024. Under
              MiCA’s transitional framework:
            </Typography>
            <BulletList
              items={[
                "VASPs registered before 30 December 2024 may continue operating legally until 1 July 2026 (“grandfathering period”).",
                "After this date, a CASP authorization will be required to continue offering regulated crypto-asset services in the European Union.",
              ]}
            />

            <Typography variant="body1" paragraph>
              As a pre-existing VASP, Urano Ecosystem Sp. z o.o. is currently
              operating lawfully under the transitional regime and is aligning
              its internal processes with MiCA supervisory expectations issued by
              ESMA and the Polish Financial Supervision Authority (KNF).
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Current Regulatory Perimeter
            </Typography>
            <BulletList
              items={[
                "complies with all applicable AML/CFT obligations under Polish and EU law;",
                "implements GDPR-aligned data-protection processes;",
                "follows MiCA-aligned operational standards for the handling, administration and lifecycle management of crypto-assets;",
                "monitors the evolving national implementation of MiCA in Poland;",
                "prepares internal adjustments required for future CASP authorization.",
              ]}
            />

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Regulatory Limitations
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Urano Ecosystem Sp. z o.o. does not:
            </Typography>
            <BulletList
              items={[
                "issue, manage or distribute MiFID II-regulated financial instruments;",
                "issue electronic money or provide payment services;",
                "offer investment advice, portfolio management or brokerage services;",
                "operate as a bank, fund, collective investment scheme or credit institution.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Its activities are strictly limited to:
            </Typography>
            <BulletList
              items={[
                "the creation and administration of crypto-assets that fall within the MiCA definition of non-MiFID crypto-assets;",
                "providing interfaces and technical workflows that enable users to interact with digital representations of tokenized structures;",
                "enabling tokenization processes under legally permitted frameworks.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Urano operates exclusively within the legally allowed scope for
              VASPs and under the compliance-by-design principles defined across
              its ecosystem components.
            </Typography>
          </Section>

          <Section id="scope" title="2. Scope of Application">
            <Typography variant="body1" paragraph>
              These Terms govern exclusively access to and use of the public
              website available at{" "}
              <ExternalLink href={SITE_URL}>{SITE_URL}</ExternalLink> (the
              “Site”) and the informational content displayed therein.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              2.1 Use of the Site
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              These Terms apply to access, browsing and general use of the Site.
              For the purposes of this section, Content includes all texts,
              graphics, code, software, images, videos, audio materials,
              documents, databases and any other elements protected by
              intellectual property rights that are published or made available
              through the Site.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              2.2 Acceptance of the Terms
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Accessing or browsing the Site, even without registration, grants
              the visitor the status of User and implies full and unconditional
              acceptance of these Terms.
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing the Site, the User undertakes to use it lawfully, in
              good faith and in accordance with principles of public order and
              standard internet practices. The User shall be solely responsible
              for any damage caused to Urano Ecosystem or third parties resulting
              from misuse of the Site.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              2.3 Exclusion of Product-Specific Terms
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              These Terms apply exclusively to the Site in its informational
              function. Access to any Urano Ecosystem modules, products or
              digital services—including, but not limited to, the uApp, uShares,
              governance mechanisms or uAssistant—will be governed by separate,
              dedicated terms and conditions which must be reviewed and
              expressly accepted by the User before accessing those
              functionalities.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              2.4 Protection of Domain Names
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The domain uranoecosystem.com, including all related subdomains,
              may not be used—online or offline—for activities that are
              misleading, imitative, harmful or detrimental to the rights,
              reputation or legitimate interests of Urano Ecosystem. Any
              unauthorized use will be pursued in accordance with applicable
              law.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              2.5 Third-Party Links and External Content
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The Site may contain links, references or promotional material
              relating to independent third parties. Urano Ecosystem is not a
              party to any contractual relationship between the User and such
              third parties, and accepts no responsibility for their terms of
              use, content, offers, products, security practices or any damages
              arising from interaction with external websites, applications or
              services. Users access third-party resources entirely at their own
              risk.
            </Typography>
          </Section>

          <Section id="limitations" title="3. Purpose and Functional Limitations">
            <Typography variant="body1" paragraph>
              The Site functions exclusively as an informational and educational
              interface. Its purpose is to present the Urano Ecosystem, provide
              official documentation, share updates, and offer general insight
              into the project’s vision, technology and regulatory framework.
            </Typography>
            <Typography variant="body1" paragraph>
              No operational features of the Urano Ecosystem (including token
              interactions, wallet operations or on-chain actions) are performed
              through the Site.
            </Typography>
            <Typography variant="body1" paragraph>
              Urano Ecosystem reserves the right to introduce additional
              informational sections or integrations in the future. Any
              operational module or digital service will always be governed by
              dedicated terms separate from these Terms.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              3.1 Future Functional Integrations
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              In accordance with applicable European and international
              regulations, Urano Ecosystem may develop and release additional
              digital modules or platforms—such as the uApp or other ecosystem
              components—that enable interaction with tokenized workflows,
              identity verification processes, or other operational features
              described in the official documentation. Each new module or
              service will be subject to its own specific terms and conditions.
              Users will be required to review and accept those terms before
              accessing any functionality beyond the informational scope of this
              Site.
            </Typography>
          </Section>

          <Section id="eligibility" title="4. User Access and Eligibility">
            <Typography variant="body1" paragraph>
              Access to this Site is free, does not require registration and is
              limited to the consultation of general informational content
              relating to the Urano Ecosystem. No operational features, token
              interactions or on-chain actions are available through this Site.
            </Typography>

            <Typography variant="body1" paragraph>
              Urano Ecosystem may, in the future, release additional digital
              modules—such as the uApp or related ecosystem services—which may
              require registration, identity verification (KYC/KYB), or other
              compliance procedures pursuant to applicable AML/CFT laws, MiCA
              (Regulation EU 2023/1114), and guidance issued by ESMA and FATF.
              Such requirements will apply exclusively to those operational
              services and will be governed by their own dedicated terms.
            </Typography>

            <Typography variant="body1" paragraph>
              Access to any future Urano services will be restricted to Users
              who:
            </Typography>
            <BulletList
              items={[
                "are of legal age according to their jurisdiction;",
                "possess full legal capacity to enter into binding agreements;",
                "are eligible under local regulations and not subject to sanctions or restricted-jurisdiction rules;",
                "accept and comply with all applicable terms and policies.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Users remain solely responsible for ensuring that access to or use
              of the Site or any related service does not violate the laws of
              their jurisdiction, including restrictions applicable to blockchain
              technologies or crypto-assets.
            </Typography>

            <Typography variant="body1" paragraph>
              Urano Ecosystem reserves the right to restrict or deny access to
              individuals or entities that do not meet eligibility requirements
              or operate from jurisdictions subject to regulatory restrictions,
              sanctions, or equivalent measures.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              4.1 Identity Verification and Compliance Procedures
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              When accessing future operational modules, Users may be required
              to undergo identity verification (KYC) or, in the case of issuers,
              business verification (KYB), in accordance with AML/CFT regulations
              and MiCA requirements. Users must provide accurate and up-to-date
              information.
            </Typography>

            <Typography variant="body1" paragraph>
              Urano Ecosystem may suspend or terminate access to operational
              services in cases of:
            </Typography>
            <BulletList
              items={[
                "incomplete or incorrect information;",
                "refusal to cooperate with compliance checks;",
                "suspected fraud or illicit activity;",
                "breach of applicable laws or contractual terms.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Urano Ecosystem may periodically request updated documentation,
              perform ongoing monitoring, and revise its AML/KYC procedures,
              including replacing external verification providers, in line with
              evolving regulatory requirements. Any changes will be published
              through official channels, and Users are responsible for reviewing
              updated terms.
            </Typography>

            <Typography variant="body1" paragraph>
              Personal data processing, cookie usage and security measures are
              governed by the Privacy Policy and Cookie Policy, available in the
              footer of the Site, which form an integral part of these Terms.
            </Typography>
          </Section>

          <Section id="lawful-use" title="5. Lawful Use and User Obligations">
            <Typography variant="body1" paragraph>
              The User is permitted to access and consult the Site exclusively
              for lawful purposes and in accordance with these Terms and with
              all applicable regulations, including those relating to
              crypto-assets, cybersecurity, data protection, and anti-money
              laundering.
            </Typography>

            <Typography variant="body1" paragraph>
              The following activities are strictly prohibited:
            </Typography>
            <BulletList
              items={[
                "engaging, directly or indirectly, in fraudulent, unlawful or prohibited conduct, including but not limited to financial crime, market manipulation, self-laundering, or activities connected to the financing of terrorism;",
                "using the Site or any future Urano services to engage with jurisdictions, individuals, or entities subject to international sanctions or restrictive measures under EU, UN, or national regulations;",
                "performing any action that may compromise the integrity, security, availability or proper functioning of the Site, including attempts at hacking, reverse engineering, automated scraping, denial-of-service attacks, or the distribution of malware, harmful scripts or misleading content;",
                "attempting to bypass security, verification, monitoring or compliance mechanisms that may be implemented by Urano Ecosystem, including identity verification (KYC/KYB), AML/CFT controls, or other eligibility requirements.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Users must also refrain from infringing the rights of Urano
              Ecosystem or third parties, including intellectual property rights,
              confidentiality obligations, personal data protection rules, and
              fair use principles.
            </Typography>

            <Typography variant="body1" paragraph>
              Urano Ecosystem reserves the right to suspend, restrict or
              permanently revoke access to the Site or to specific services in
              the event of violations of these Terms, applicable law, or
              principles of good faith and responsible use.
            </Typography>
          </Section>

          <Section
            id="no-advice"
            title="6. Exclusion of Advice, Offers and Investment Solicitation"
          >
            <Typography variant="body1" paragraph>
              All information contained on the Site is provided solely for
              informational and educational purposes. Nothing published on the
              Site shall be interpreted as:
            </Typography>

            <BulletList
              items={[
                "investment, legal, financial, tax or professional advice;",
                "an offer or invitation to buy or sell crypto-assets or tokenized products;",
                "a public offering or marketing activity under the Prospectus Regulation (EU) 2017/1129;",
                "a solicitation to participate in any tokenization initiative or crypto-asset project.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Urano Ecosystem Sp. z o.o. operates exclusively within the
              regulatory perimeter applicable to crypto-assets, in line with its
              registration as a Virtual Asset Service Provider (VASP) in Poland
              (RDWW-746) and within the transitional framework of Regulation (EU)
              2023/1114 (“MiCA”).
            </Typography>

            <Typography variant="body1" paragraph>
              The Site does not guarantee results, returns, performance, or the
              success of any initiative. Any decision relating to blockchain,
              digital assets, or tokenization activities must be made
              independently by the User, after conducting appropriate due
              diligence and—where necessary—obtaining advice from qualified
              professionals. Digital assets may involve significant risks,
              including loss of capital, volatility, technical vulnerabilities or
              regulatory changes.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              6.1 Tax Obligations
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Users are solely responsible for determining, declaring and
              fulfilling all tax, fiscal, reporting or compliance obligations
              arising from:
            </Typography>
            <BulletList
              items={[
                "accessing or using the Site;",
                "interacting with any future Urano services;",
                "acquiring, receiving, holding, transferring or disposing of tokens or digital instruments.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Depending on the jurisdiction, such obligations may include:
            </Typography>
            <BulletList
              items={[
                "income or capital gains taxation;",
                "VAT or other indirect taxes;",
                "cross-border reporting frameworks (including DAC8, CRS, or equivalent domestic rules);",
                "wealth taxes or other local levies.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Urano Ecosystem does not act as a tax intermediary or withholding
              agent, does not provide tax, accounting or fiscal advice, and
              declines any responsibility for tax obligations, errors, omissions
              or non-compliance by Users. Users are strongly encouraged to
              consult a qualified tax advisor in their jurisdiction to ensure
              full compliance with all applicable obligations.
            </Typography>
          </Section>

          <Section id="ip" title="7. Intellectual and Industrial Property">
            <Typography variant="body1" paragraph>
              All content made available on the Site — including, without
              limitation, texts, graphics, logos, trademarks, icons, images,
              code, documents, databases, audiovisual elements, software and
              layout — is the exclusive property of Urano Ecosystem Sp. z o.o.
              or of its licensors and is protected by national, EU and
              international laws on intellectual and industrial property.
            </Typography>

            <Typography variant="body1" paragraph>
              Any reproduction, copying, distribution, publication, modification,
              adaptation, transmission, dissemination, extraction or reuse —
              including partial — of the Site’s content without prior written
              authorisation from Urano Ecosystem or the relevant rights holder is
              strictly prohibited.
            </Typography>

            <Typography variant="body1" paragraph>
              The use of the name “Urano Ecosystem”, the Company’s logo, or any
              other brand identifiers in contexts that may cause confusion,
              mislead users, or damage the reputation of the Company is likewise
              prohibited.
            </Typography>

            <Typography variant="body1" paragraph>
              Certain content published on the Site may be owned or licensed by
              third parties. In such cases, the respective rights remain with
              their legitimate owners and are subject to the applicable
              licensing terms, which Users are required to comply with.
            </Typography>

            <Typography variant="body1" paragraph>
              The use of automated tools such as bots, scrapers or spiders to
              collect, index, copy or extract content from the Site is
              prohibited unless expressly authorised in writing.
            </Typography>

            <Typography variant="body1" paragraph>
              Access to the Site grants Users a limited, revocable and
              non-exclusive licence to consult the content for personal and
              non-commercial purposes only, in full compliance with these Terms.
              Any unauthorised or unlawful use may give rise to civil or criminal
              liability and will be prosecuted before the competent authorities.
            </Typography>
          </Section>

          <Section id="liability" title="8. Limitation of Liability">
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              8.1 Assumption of Risk and Individual Responsibility
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The User acknowledges that accessing and using the Site — as well
              as any future interaction with Web3 components, blockchain tools,
              tokenization workflows or related digital services that may be
              integrated by Urano Ecosystem — involves inherent risks, including,
              without limitation:
            </Typography>

            <BulletList
              items={[
                "volatility and unpredictability of crypto-asset markets;",
                "potential partial or total loss of capital;",
                "technological risks (bugs, outages, cyberattacks, smart contract vulnerabilities);",
                "regulatory and legal uncertainty at national and EU level;",
                "risks associated with the self-custody of wallets, private keys and credentials.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Urano Ecosystem does not provide financial, legal or tax advice.
              All information on the Site is provided for general informational
              purposes only and must not be interpreted as investment advice,
              financial promotion or an invitation to participate in any
              project. Each User is solely responsible for assessing their own
              risk profile, performing appropriate due diligence, and seeking
              professional advice where necessary.
            </Typography>

            <Typography variant="body1" paragraph>
              To the maximum extent permitted by applicable law, Urano Ecosystem
              is not liable for direct, indirect, incidental, consequential or
              punitive damages arising from the use or inability to use the Site,
              User errors, reliance on published information, or events beyond
              the Company’s control.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              8.2 Force Majeure
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Urano Ecosystem shall not be responsible for delays, interruptions,
              failures or unavailability of the Site or of any future services
              caused by force majeure events or circumstances beyond its
              reasonable control, including but not limited to:
            </Typography>

            <BulletList
              items={[
                "natural disasters;",
                "war, civil unrest, terrorism;",
                "pandemics or public health emergencies;",
                "strikes, power outages, infrastructure failures;",
                "failures of internet networks or cloud providers;",
                "cyberattacks or unexpected vulnerabilities.",
              ]}
            />

            <Typography variant="body1" paragraph>
              The Company will take reasonable steps to restore normal operations
              but cannot be held liable for any losses resulting from such events.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              8.3 Wallets and Third-Party Tools
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The current Site does not enable direct interaction with digital
              wallets. Should such integrations be introduced in the future,
              Users will bear full and exclusive responsibility for the security
              of their own tools, including private keys and seed phrases,
              authentication credentials, and hardware or software wallet
              solutions. Urano Ecosystem has no access to user wallets or funds
              and cannot be held liable for losses, unauthorised access,
              malfunctions or breaches attributable to third-party software or
              User negligence.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              8.4 External Links and Third-Party Content
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The Site may include links, references or promotional elements
              directing Users to third-party platforms. Such resources are
              provided solely for convenience. Urano Ecosystem does not exercise
              control over external content, does not guarantee its accuracy,
              legality or reliability, and does not endorse or assume
              responsibility for any third-party service, offer or policy. Users
              interact with third-party platforms at their own risk, and Urano
              Ecosystem declines any liability arising from such interactions.
            </Typography>
          </Section>

          <Section id="privacy" title="9. Personal Data Protection, Cookies and Security">
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              9.1 Personal Data Processing
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Use of the Site may involve limited processing of personal data
              (e.g., IP addresses, technical identifiers, browsing data). Such
              processing is carried out by Urano Ecosystem Sp. z o.o., in its
              capacity as data controller, in full compliance with Regulation
              (EU) 2016/679 (GDPR), applicable national legislation, and
              recognised cybersecurity best practices. The methods, purposes and
              legal bases of data processing are described in the Privacy Policy
              and Cookie Policy, accessible via the Site footer.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              9.2 Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The Site currently uses only essential technical cookies required
              for correct operation and for secure delivery of content. Cookie
              management is handled through Cookiebot, which ensures GDPR- and
              ePrivacy-compliant consent mechanisms. If analytical, functional
              or third-party cookies are introduced in the future, they will only
              be activated following the User’s explicit informed consent.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              9.3 Security Measures
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Urano Ecosystem implements appropriate technical and organisational
              measures to ensure the confidentiality, integrity, availability and
              resilience of its systems and processed data. Security controls
              include encryption mechanisms, restricted-access systems, log
              monitoring, and minimisation of collected data. These measures are
              periodically reviewed and updated based on emerging risks and
              cybersecurity standards.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              9.4 Document Hierarchy and Reference to Policies
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              The following documents form an integral part of these Terms and
              Conditions:
            </Typography>
            <List dense sx={{ mt: 0.25 }}>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  Privacy Policy → <ExternalLink href={PRIVACY_URL}>{PRIVACY_URL}</ExternalLink>
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  Cookie Policy → <ExternalLink href={COOKIE_URL}>{COOKIE_URL}</ExternalLink>
                </Typography>
              </ListItem>
            </List>

            <Typography variant="body1" paragraph>
              In the event of discrepancies between these Terms and the above
              documents, applicable law and the provisions most protective of
              User rights shall prevail.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              9.5 Integration of Future Services Requiring KYC/AML
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 0.5 }}>
              Future modules or digital services integrated into the Urano
              Ecosystem may require mandatory identity verification (KYC) and
              customer due diligence (AML/CFT), depending on regulatory
              requirements. Such checks will be conducted in accordance with
              GDPR, EU AML directives (including Directive (EU) 2015/849 and its
              amendments), FATF recommendations, MiCA (Regulation (EU) 2023/1114),
              and Regulation (EU) 2023/1113 (TFR – Transfer of Funds Regulation),
              as applicable. Each new service will be governed by specific terms,
              which Users must review and accept before accessing the
              functionality.
            </Typography>

            <Typography variant="body1" paragraph>
              Users are responsible for regularly consulting these Terms and all
              related policies to remain informed of updates. Urano Ecosystem
              reserves the right to amend or expand these Terms in line with
              regulatory or operational developments. Unless otherwise specified,
              changes take effect upon publication on the Site.
            </Typography>
          </Section>

          <Section id="updates" title="10. Changes and Updates to the Terms">
            <Typography variant="body1" paragraph>
              Urano Ecosystem reserves the right to modify, supplement or update
              these Terms and Conditions at any time, as well as any related
              documents (including, but not limited to, the Privacy Policy,
              Cookie Policy and specific terms applicable to individual
              services). Updates may be required to reflect changes in applicable
              laws or regulatory frameworks (e.g., GDPR, MiCA, AML, ePrivacy),
              technological or infrastructure developments, or organisational
              requirements or changes in the services offered.
            </Typography>

            <Typography variant="body1" paragraph>
              All updates will be published on the Site and will constitute
              official notice to Users. The date of the latest revision will be
              displayed at the end of this document.
            </Typography>

            <Typography variant="body1" paragraph>
              By continuing to access or use the Site or any future integrated
              services after such updates, the User acknowledges and accepts the
              revised Terms. In the event of substantial modifications that
              materially affect User rights or obligations, Urano Ecosystem may
              provide additional notice at its discretion, including through
              banners, pop-ups or other electronic communication tools.
            </Typography>
          </Section>

          <Section id="suspension" title="11. Suspension, Interruption or Limitation of Access">
            <Typography variant="body1" paragraph>
              Urano Ecosystem reserves the right to suspend, limit, or
              temporarily or permanently interrupt access to the Site, or to
              specific functionalities, at any time and without prior notice, in
              the following circumstances:
            </Typography>

            <BulletList
              items={[
                "ordinary or extraordinary maintenance activities;",
                "technological, infrastructural or security updates;",
                "cybersecurity or data-protection requirements, including measures necessary to safeguard platform integrity;",
                "compliance with legal obligations, orders from competent authorities or international sanctions;",
                "actual or suspected violation of these Terms or improper use of the Site.",
              ]}
            />

            <Typography variant="body1" paragraph>
              Such measures may apply to the entire Site, specific sections or
              modules, or individual Users, IP ranges or jurisdictions, where
              necessary to ensure regulatory compliance or operational security.
              Where reasonably possible, Urano Ecosystem will seek to restore
              normal access without undue delay. The Company shall not be held
              liable for any losses or damages resulting from lawful suspensions
              or limitations carried out in accordance with this document.
            </Typography>
          </Section>

          <Section id="law" title="12. Governing Law and Dispute Resolution">
            <Typography variant="body1" paragraph>
              These Terms and Conditions, together with any use of the Site and
              related informational content, are governed by the substantive law
              of the Republic of Poland, without prejudice to any non-derogable
              rights granted to Users under European Union law.
            </Typography>

            <Typography variant="body1" paragraph>
              Any dispute concerning the interpretation, validity or performance
              of these Terms—or arising from access to or use of the Site—shall
              fall under the exclusive jurisdiction of the ordinary courts of
              Poland, unless otherwise mandated by applicable EU consumer-
              protection rules.
            </Typography>

            <Typography variant="body1" paragraph>
              Whenever possible, Urano Ecosystem and the User agree to first seek
              resolution through individual arbitration or alternative dispute
              resolution mechanisms, in accordance with recognised European
              commercial arbitration standards, provided both parties mutually
              consent.
            </Typography>

            <Typography variant="body1" paragraph>
              Collective actions, class actions or joint proceedings—whether
              initiated by the User or on behalf of third parties—are not
              permitted.
            </Typography>
          </Section>

          <Section id="severability" title="13. Severability Clause">
            <Typography variant="body1" paragraph>
              If any provision of these Terms is found to be invalid, unlawful
              or unenforceable by a court, arbitral body or competent authority,
              such invalidity shall not affect the validity and enforceability
              of the remaining provisions, which shall continue in full force
              and effect.
            </Typography>

            <Typography variant="body1" paragraph>
              Where possible, the invalid or unenforceable provision shall be
              replaced with a lawful clause that reflects, as closely as
              permissible, the original intent and purpose of the parties.
            </Typography>

            <Typography variant="body1" paragraph>
              Any failure or delay by Urano Ecosystem in exercising a right
              arising from these Terms shall not constitute a waiver of such
              right, nor shall it prevent its later exercise.
            </Typography>
          </Section>

          <Section id="supplementary" title="14. Supplementary Documentation">
            <Typography variant="body1" paragraph>
              Use of the Site is also governed by the following documents, which
              form an integral and binding part of these Terms and Conditions:
            </Typography>

            <List dense sx={{ mt: 0.25 }}>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  Privacy Policy → <ExternalLink href={PRIVACY_URL}>{PRIVACY_URL}</ExternalLink>
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  Cookie Policy → <ExternalLink href={COOKIE_URL}>{COOKIE_URL}</ExternalLink>
                </Typography>
              </ListItem>
            </List>

            <Typography variant="body1" paragraph>
              In the event of a conflict between these Terms and any of the
              above-mentioned policies, the provisions most favourable to User
              protection shall prevail, within the limits permitted by
              applicable legislation—including GDPR (Regulation EU 2016/679),
              the ePrivacy framework, MiCA (Regulation EU 2023/1114) and other
              relevant EU or national regulations.
            </Typography>

            <Typography variant="body1" paragraph>
              For any future services, modules or functionalities made available
              through dedicated interfaces, external platforms or smart
              contracts, specific policies (e.g., Privacy Notices, Data
              Processing Disclosures) will be published and made accessible as
              required by law. Such documents will govern data processing,
              tracking, identity verification and operational procedures
              relating to those services.
            </Typography>

            <Typography variant="body1" paragraph>
              All supplementary documents will be accessible through the footer
              of the Site or within the interfaces of the relevant services.
              Users must review and accept these terms before accessing the
              corresponding functionalities.
            </Typography>
          </Section>

          <Section id="contacts" title="15. Official Contacts">
            <Typography variant="body1" paragraph>
              For any communications, Users may contact Urano Ecosystem through
              the following official channels:
            </Typography>

            <List dense sx={{ mt: 0.25 }}>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  <MailLink email="info@uranoecosystem.com">
                    info@uranoecosystem.com
                  </MailLink>{" "}
                  — Technical and general support
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  <MailLink email="social@uranoecosystem.com">
                    social@uranoecosystem.com
                  </MailLink>{" "}
                  — Media relations and communication inquiries
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  <MailLink email="official@uranoecosystem.com">
                    official@uranoecosystem.com
                  </MailLink>{" "}
                  — Partnerships and issuer onboarding
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0.35, alignItems: "flex-start" }}>
                <Typography variant="body1">
                  <MailLink email="dpo@uranoecosystem.com">
                    dpo@uranoecosystem.com
                  </MailLink>{" "}
                  — Data Protection Officer (DPO) contact
                </Typography>
              </ListItem>
            </List>
          </Section>

          <Divider sx={{ borderColor: theme.palette.secondary.main }} />

          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: {LAST_UPDATED}
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
