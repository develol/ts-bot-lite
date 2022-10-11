# ts-bot-lite
[TypeScript] NodeJS module of messenger bots (Telegram, VK and Viber)

***Node.js v18.2.0+***\
***TypeScript v4.8.0+***

- [Getting started](#sender-of-requests)
- [Sender of requests](#sender-of-requests)
  - [Initialization](#initialization)
  - [Create keyboard](#create-keyboard)
  - [Text message formatting](#text-message-formatting)
  - [Send a text message](#send-a-text-message)
  - [Send an image](#send-an-image)
  - [Send a file](#send-a-file)
  - [Send a location](#send-a-location)
  - [Get user information](#get-user-information)
  - [Custom request (by official Bot API)](#custom-request-by-official-bot-api)
- [Receiving messages](#receiving-messages)

## Getting started
Cloning this repository and...
```
npm i --save <path_to_repository>/ts-bot-lite
```
## Sender of requests
### Initialization
#### Import module
```typescript
//Importing a module
import * as botLite from 'ts-bot-lite';
```
#### Object declaration
```typescript
// Object declaration for Telegram
let requesterTelegram = new botLite.RequestTelegram({
    token: '<api_key>'
});
```
```typescript
// Object declaration for VK
let requesterVK = new botLite.RequestVK({
    token: '<api_key>'
});
```
```typescript
// Object declaration for Viber
let requesterViber = new botLite.RequestViber({
    token: '<api_key>'
});
```
### Create keyboard
```typescript
let keyboards = new botLite.Keyboard({
  keyboard: [[
    '<button_1_1>', 
    '<button_1_2>',
    ...
    '<button_1_n>'
  ],
    ...
  [
    '<button_n_1>', 
    '<button_n_2>', 
    ...
    '<button_n_n>'
  ]]
});
```
### Text message formatting
```typescript
// Formatting HTML text
let textHTML = new botLite.Texter({
  markup: 'html',
  text:   '<b>bold</b><br><i>italic</i><br><code>code</code><br><s>strike</s>'
});
```
```typescript
// Formatting Markdown text
let textMarkdown = new botLite.Texter({
  markup: 'markdown',
  text:   '*bold*\r\n_italic_\r\n`code`\r\n```code```\r\n~strike~'
});
```
```typescript
// Custom text
let textCustom = 'bold\r\nitalic\r\ncode\r\ncode\r\nstrike';
```
### Send a text message
#### Code
```typescript
// Send a text message (Telegram) and console.log(<response>)
requesterTelegram.sendText({
  user:     '<user_id>', 
  keyboard: keyboards.telegram(), 
  text:     textHTML.telegram() // or textMarkdown.telegram() or textCustom
}).then((r:any) => console.log(r));
```
```typescript
// Send a text message (VK) and console.log(<response>)
requesterVK.sendText({
  user:     '<user_id>', 
  keyboard: keyboards.vk(), 
  text:     textCustom.vk() // or textMarkdown.vk() or textCustom
}).then((r:any) => console.log(r));
```
```typescript
// Send a text message (Viber) and console.log(<response>)
requesterViber.sendText({
  user:     '<user_id>', 
  keyboard: keyboards.viber(), 
  text:     textCustom.viber() // or textMarkdown.viber() or textCustom
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'send',
  date: <date_and_time>, # Unix-time format
  statusText: { 
    ok: true, 
    messageId: <message_id>
  }
}
```
### Send an image
#### Code
```typescript
// Send an image (Telegram) and console.log(<response>)
requesterTelegram.sendPhoto({
  user:     '<user_id>', 
  keyboard: keyboards.telegram(), 
  text:     textHTML.telegram(), // or textMarkdown.telegram() or textCustom
  url:      '<image_link>' // https://example.org/image.png
}).then((r:any) => console.log(r));
```
```typescript
// Send an image (VK) and console.log(<response>)
requesterVK.sendPhoto({
  user:     '<user_id>', 
  keyboard: keyboards.vk(), 
  text:     textCustom.vk(), // or textMarkdown.vk() or textCustom
  url:      '<image_link>' // https://example.org/image.png
}).then((r:any) => console.log(r));
```
```typescript
// Send an image (Viber) and console.log(<response>)
requesterViber.sendPhoto({
  user:     '<user_id>', 
  keyboard: keyboards.viber(), 
  text:     textCustom.viber(), // or textMarkdown.viber() or textCustom
  url:      '<image_link>' // https://example.org/image.png
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'send',
  date: <date_and_time>, # Unix-time format
  statusText: { 
    ok:        true, 
    messageId: <message_id>
  }
}
```
### Send a file
#### Code
```typescript
// Send a file (Telegram) and console.log(<response>)
requesterTelegram.sendFile({
  user:     '<user_id>', 
  keyboard: keyboards.telegram(), 
  url:      '<file_link>' // https://example.org/file.txt
}).then((r:any) => console.log(r));
```
```typescript
// Send a file (VK) and console.log(<response>)
requesterVK.sendFile({
  user:     '<user_id>', 
  keyboard: keyboards.vk(), 
  url:      '<file_link>' // https://example.org/file.txt
}).then((r:any) => console.log(r));
```
```typescript
// Send a file (Viber) and console.log(<response>)
requesterViber.sendFile({
  user:     '<user_id>', 
  keyboard: keyboards.viber(), 
  url:      '<file_link>' // https://example.org/file.txt
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'send',
  date: <date_and_time>, # Unix-time format
  statusText: { 
    ok: true, 
    messageId: <message_id>
  }
}
```
### Send a location
#### Code
```typescript
// Send a location (Telegram) and console.log(<response>)
requesterTelegram.sendLocation({
  user:      '<user_id>', 
  keyboard:  keyboards.telegram(), 
  latitude:  '<latitude>', 
  longitude: '<longitude>'
}).then((r:any) => console.log(r));
```
```typescript
// Send a location (VK) and console.log(<response>)
requesterVK.sendLocation({
  user:      '<user_id>', 
  keyboard:  keyboards.vk(), 
  latitude:  '<latitude>', 
  longitude: '<longitude>'
}).then((r:any) => console.log(r));
```
```typescript
// Send a location (Viber) and console.log(<response>)
requesterViber.sendLocation({
  user:      '<user_id>', 
  keyboard:  keyboards.viber(), 
  latitude:  '<latitude>', 
  longitude: '<longitude>'
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'send',
  date: <date_and_time>, # Unix-time format
  statusText: { 
    ok: true, 
    messageId: <message_id>
  }
}
```
### Get user information
#### Code
```typescript
// Get user information (Telegram) and console.log(<response>)
requesterTelegram.getUserInfo({
  user: '<user_id>'
}).then((r:any) => console.log(r));
```
```typescript
// Get user information (VK) and console.log(<response>)
requesterVK.getUserInfo({
  user: '<user_id>'
}).then((r:any) => console.log(r));
```
```typescript
// Get user information (Viber) and console.log(<response>)
requesterViber.getUserInfo({
  user: '<user_id>'
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'getUserInfo',
  date: <date_and_time>, # Unix-time format
  statusText: {
    ok: true,
    userName: '<username>',
    firstName: <first_name>,
    lastName: <last_name>
  }
}
```
### Custom request (by official Bot API)

- [Telegram API](https://core.telegram.org/bots/api)
- [VK API](https://dev.vk.com/api/bots/getting-started)
- [Viber API](https://developers.viber.com/docs/api/rest-bot-api/)

#### Code
```typescript
// Custom request (Telegram) and console.log(<response>)
requesterTelegram.fetchSender({
  param: {
    <parameter_1>:'<value_1>',
    <parameter_2>:'<value_2>',
    ...
    <parameter_n>:'<value_n>'
  },
  page:         '<method>',
  responseType: 'custom'
}).then((r:any) => console.log(r));
```
```typescript
// Custom request (VK) and console.log(<response>)
requesterVK.fetchSender({
  param: {
    <parameter_1>:'<value_1>',
    <parameter_2>:'<value_2>',
    ...
    <parameter_n>:'<value_n>'
  },
  page:         '<method>',
  responseType: 'custom'
}).then((r:any) => console.log(r));
```
```typescript
// Custom request (Viber) and console.log(<response>)
requesterViber.fetchSender({
  param: {
    <parameter_1>:'<value_1>',
    <parameter_2>:'<value_2>',
    ...
    <parameter_n>:'<value_n>'
  },
  page:         '<method>',
  responseType: 'custom'
}).then((r:any) => console.log(r));
```
#### Response
```yaml
{
  ok: true,
  messenger: '<messenger>', # telegram or vk or viber
  mask: 'custom',
  date: <date_and_time>, # Unix-time format
  statusText: {
    <response_to_request>
  }
}
```
## Receiving messages
_This module is under development_
