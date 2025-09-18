/**
 * Function to create a calendar event in Google Calendar.
 *
 * @param {Object} args - Arguments for creating the event.
 * @param {string} args.calendarId - The ID of the calendar where the event will be created.
 * @param {Object} args.eventData - The data for the event to be created.
 * @param {string} args.eventData.summary - The summary of the event.
 * @param {Object} args.eventData.start - The start time of the event.
 * @param {string} args.eventData.start.dateTime - The start date and time of the event in ISO format.
 * @param {string} args.eventData.start.timeZone - The time zone of the start time.
 * @param {Object} args.eventData.end - The end time of the event.
 * @param {string} args.eventData.end.dateTime - The end date and time of the event in ISO format.
 * @param {string} args.eventData.end.timeZone - The time zone of the end time.
 * @param {string} [args.eventData.location] - The location of the event.
 * @param {string} [args.eventData.status] - The status of the event (e.g., "tentative", "confirmed").
 * @param {string} [args.eventData.transparency] - The transparency of the event (e.g., "transparent", "opaque").
 * @returns {Promise<Object>} - The result of the event creation.
 */
const executeFunction = async ({ calendarId, eventData }) => {
  const baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';
  const token = process.env.ISTRUZI_API_KEY;
  try {
    // Validate time range
    const startTime = new Date(eventData.start.dateTime);
    const endTime = new Date(eventData.end.dateTime);
    if (startTime >= endTime) {
      throw new Error('End time must be after start time');
    }
    // Construct the URL for the event creation
    const url = `${baseUrl}/${calendarId}/events?sendUpdates=none`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(eventData)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      error: `An error occurred while creating the calendar event: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a calendar event in Google Calendar.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_calendar_event',
      description: 'Create a calendar event in Google Calendar.',
      parameters: {
        type: 'object',
        properties: {
          calendarId: {
            type: 'string',
            description: 'The ID of the calendar where the event will be created.'
          },
          eventData: {
            type: 'object',
            properties: {
              summary: {
                type: 'string',
                description: 'The summary of the event.'
              },
              start: {
                type: 'object',
                properties: {
                  dateTime: {
                    type: 'string',
                    description: 'The start date and time of the event in ISO format.'
                  },
                  timeZone: {
                    type: 'string',
                    description: 'The time zone of the start time.'
                  }
                },
                required: ['dateTime', 'timeZone']
              },
              end: {
                type: 'object',
                properties: {
                  dateTime: {
                    type: 'string',
                    description: 'The end date and time of the event in ISO format.'
                  },
                  timeZone: {
                    type: 'string',
                    description: 'The time zone of the end time.'
                  }
                },
                required: ['dateTime', 'timeZone']
              },
              location: {
                type: 'string',
                description: 'The location of the event.'
              },
              status: {
                type: 'string',
                description: 'The status of the event (e.g., "tentative", "confirmed").'
              },
              transparency: {
                type: 'string',
                description: 'The transparency of the event (e.g., "transparent", "opaque").'
              }
            },
            required: ['summary', 'start', 'end']
          }
        },
        required: ['calendarId', 'eventData']
      }
    }
  }
};

export { apiTool };