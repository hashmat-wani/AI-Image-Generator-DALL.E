import Redis from "ioredis";
let redis;
try {
  redis = new Redis({
    port: 17514, // Redis port
    host: "redis-17514.c264.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "kd2WWQrMr3Kvq9U3aPmycTTTknjEePeS",
    db: 0, // Defaults to 0
  });
} catch (err) {
  console.log("err", err);
}

export default redis;
