// export interface Agent {
//   id: string;
//   name: string;
//   description: string;
//   welcomeMessage: string;
// }
export interface Agent {
  agent_id: string;  // Correcting to match API response
  agent_name: string; // Correcting to match API response
  s3_bucket: string;  // Correcting to match API response
}