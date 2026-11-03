interface SendMessageToDiscordWebhookPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const sendMessageToDiscordWebhook = async (
  form: SendMessageToDiscordWebhookPayload,
) => {
  const discordWebhookPayload2 = {
    username: "Website Contact Form",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/732/732200.png", // optional

    // Main bold message with date
    content: `**🆕 New Contact Form Submission**\n\n📅 ${new Date().toLocaleString()}`,

    embeds: [
      // Embed 1: Contact Details
      {
        title: "👤 Contact Details",
        color: 0x57f287, // green
        fields: [
          {
            name: "Name",
            value: form.name || "N/A",
            // inline: true,
          },
          {
            name: "Email",
            value: form.email || "N/A",
            // inline: true,
          },
        ],
      },

      // Embed 2: Other Details
      {
        title: "📋 Other Details",
        color: 0x5865f2, // blurple
        fields: [
          {
            name: "Company",
            value: form.company || "N/A",
            inline: true,
          },
          {
            name: "Phone",
            value: form.phone || "N/A",
            inline: true,
          },
          {
            name: "Service",
            value: form.service || "N/A",
            inline: true,
          },
          {
            name: "Message",
            value: form.message || "No message provided",
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };
  const discordWebhookPayload = {
    username: "Website Contact Form",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/732/732200.png", // optional
    embeds: [
      {
        title:
          "📩 New Contact Form Submission (" + new Date().toDateString() + ")",
        color: 0x5865f2, // Discord blurple
        fields: [
          {
            name: "👤 Name",
            value: form.name || "N/A",
          },
          {
            name: "📧 Email",
            value: form.email || "N/A",
          },
          {
            name: "🏢 Company",
            value: form.company || "N/A",
          },
          {
            name: "📞 Phone",
            value: form.phone || "N/A",
          },
          {
            name: "🛠️ Service",
            value: form.service || "N/A",
          },
          {
            name: "💬 Message",
            value: form.message || "No message provided",
          },
        ],
        footer: {
          text: "Contact Form • Your Website",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  if (process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL) {
    await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordWebhookPayload),
    });
  }
};

export default sendMessageToDiscordWebhook;
