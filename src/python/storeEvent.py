import json
import boto3

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Specify your DynamoDB table name
table_name = 'Local_events'

# Function to add an event to DynamoDB with image reference
def add_event(event_details, image_url):
    table = dynamodb.Table(table_name)
    
    response = table.put_item(
        Item={
            'EventID': event_details['event_id'],
            'EventTitle': event_details['event_name'],
            'EventDate': event_details['event_date'],
            'EventStart': event_details['start_time'],
            'EventEnd': event_details['end_time'],
            'EventLocation': event_details['event_Location'],
            'EventGenre': event_details['event_genre'],
            'EventDescription': event_details['event_description'],
            'EventImageUrl': image_url,  # Store the S3 image reference
            # Add more attributes as needed
        }
    )
    
    return response

def lambda_handler(event, context):
    try:
        # Assuming event contains data from the form
        event_data = json.loads(event['body'])
        
        # Example S3 image URL
        s3_image_url = 's3://eventbookie/event_images/' + event_data['event_id'] + '.jpg'
        
        # Add event to DynamoDB
        response = add_event(event_data, s3_image_url)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Event added successfully'),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}'),
        }
