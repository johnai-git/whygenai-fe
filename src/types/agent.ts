export interface Agent {
  agent_id: string;  
  agent_name: string; 
  s3_bucket: string;
  file_name: string | null; // In  
}