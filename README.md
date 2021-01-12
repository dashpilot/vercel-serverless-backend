# vercel-firebase-s3

Simple serverless backend for Vercel: it uses Firebase for auth and saves the data to Amazon S3/Digitalocean Spaces/Linode Object Storage

# How To

1.  Clone this repo and connect to Vercel
2.  Set the following environment variables in Vercel:

S3_ENDPOINT: the endpoint of your S3-compatible storage (e.g. eu-central-1.linodeobjects.com)\\
S3_BUCKET: your bucket\\
S3_KEY: your S3 key\\
S3_SECRET: your S3 secret\\

3.  Visit index.html to check out the demos
