export interface Agent {
  id: number,
  agent_id: string;
  agent_name: string;
  s3_bucket: string;
  file_name: string | null; // In  
  welcome_message: string ; // In  
}