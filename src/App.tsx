import React, { useState } from "react";
import { Navbar, MantineProvider } from "@mantine/core";
import {
  IconMessages,
  IconDatabase,
  IconSettings,
  IconPlus,
  IconAnalyze,
} from "@tabler/icons-react";
import { ThemeIcon, UnstyledButton, Text } from "@mantine/core";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  rem,
  ColorSchemeProvider,
} from "@mantine/core";

import Workshop from "./Workshop";
import Data from "./Data";
import OnboardingView from "./Onboarding";
import Drop from "./Drop";
import AnalyticsView from "./Analytics";


interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const data = [
  { icon: <IconMessages size="1rem" />, color: "violet", label: "Workshop" },
  { icon: <IconPlus size="1rem" />, color: "yellow", label: "Create" },
  { icon: <IconAnalyze size="1rem" />, color: "red", label: "Analytics" },
];

function App() {
  const [selectedLink, setSelectedLink] = useState(""); // State to keep track of the selected link

  const handleLinkClick = (label: string) => {
    setSelectedLink(label);
  };

  const renderComponent = () => {
    switch (selectedLink) {
      case "Workshop":
        return <Workshop />;
      case "Create":
        return <OnboardingView />;
      case "Analytics":
        return <AnalyticsView />;
      default:
        return <Workshop />;
    }
  };

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div>
    <Text size="lg" weight={700} style={{ marginBottom: '0 rem', paddingLeft: '1rem', paddingTop:'0.5rem' }}>
      Wing Sandbox
    </Text>
        <div style={{ display: "flex" }}>
          <Navbar height={775} p="xs" width={{ base: 300 }}>
            <Navbar.Section grow mt="md">
              <MainLinks
                handleLinkClick={handleLinkClick}
                selectedLink={selectedLink}
              />
            </Navbar.Section>
          </Navbar>
          <div style={{ flex: "1", padding: "md" }}>{renderComponent()}</div>
        </div>
      </div>
    </MantineProvider>
  );
}

function MainLink({
  icon,
  color,
  label,
  handleClick,
}: MainLinkProps & { handleClick: (label: string) => void }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={() => handleClick(label)} // Call the handleClick function with the label as an argument
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

function MainLinks({
  handleLinkClick,
  selectedLink,
}: {
  handleLinkClick: (label: string) => void;
  selectedLink: string;
}) {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} handleClick={handleLinkClick} />
  ));
  return <div>{links}</div>;
}

export default App;
