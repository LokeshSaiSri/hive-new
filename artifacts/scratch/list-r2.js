const fs = require('fs');
const dotenv = require('dotenv');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const env = dotenv.parse(fs.readFileSync('d:\\hive-new\\.env.local'));
const accountId = env.R2_ACCOUNT_ID;
const accessKeyId = env.R2_ACCESS_KEY_ID;
const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
const bucketName = env.R2_BUCKET_NAME;

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function list() {
  try {
    const data = await S3.send(new ListObjectsV2Command({ Bucket: bucketName }));
    console.log(data.Contents.map(c => c.Key).join('\n'));
  } catch (err) {
    console.error(err);
  }
}
list();
