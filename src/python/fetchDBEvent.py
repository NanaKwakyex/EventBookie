import json
import boto3
from botocore.exceptions import ClientError

# Initialize a DynamoDB client
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # Fetch event data from DynamoDB
        response = dynamodb.scan(
            TableName='Local_events'
        )

        # Process the response and extract event data
        events = response.get('Items', [])

        # Prepare a response
        event_list = []

        for event_item in events:
            event = {
                'event_id': event_item['event_id']['S'],
                'event_name': event_item['event_name']['S'],
                'event_date': event_details['event_date']['S'],
                'start_time': event_details['start_time']['S'],
                'end_time': event_details['end_time']['S'],
                'event_description': event_item['event_description']['S'],
                'image_url': event_item['image_url']['S'],
                # Add more event details here
            }
            event_list.append(event)

        return {
            'statusCode': 200,
            'body': json.dumps(event_list)
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
