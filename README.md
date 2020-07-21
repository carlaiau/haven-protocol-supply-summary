# Haven Supply Summary. Work in progress


Quick site built to give a summary of the current Haven ecosystem.

The purpose was to make a more user friendly version of Haven's own <a href="https://explorer.havenprotocol.org/supply">block explorer</a> until the core team has more time to work on their own.

## Client
Gatsby using Bulma and Emotion.

Hosted on Netlify

## Server
Pretty gross. Express app that is downloading the source of the <a href="https://explorer.havenprotocol.org/supply">block explorer</a> and parsing out the table of supply data.

Hosted on EC2, nano instance. Hopefully it doesn't blow up.

## Future Plans
Work with haven core team on a more refined version, with historical/graphs that actually runs from the blockchain itself rather than sraping.

