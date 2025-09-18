/**
 * Function to get events from Google Calendar.
 *
 * @param {Object} args - Arguments for retrieving events.
 * @param {string} args.calendar_id - The ID of the calendar to retrieve events from.
 * @param {boolean} [args.showHiddenInvitations=false] - Whether to show hidden invitations.
 * @param {boolean} [args.singleEvents=true] - Whether to return single events instead of recurring events.
 * @param {boolean} [args.alwaysIncludeEmail=false] - Whether to always include email addresses.
 * @param {string} [args.orderBy="startTime"] - The order in which to sort the events.
 * @returns {Promise<Object>} - The result of the event retrieval.
 */
const executeFunction = async ({ calendar_id, showHiddenInvitations = false, singleEvents = true, alwaysIncludeEmail = false, orderBy = 'startTime' }) => {
  const baseUrl = 'https://content.googleapis.com/calendar/v3/calendars';
  const token = process.env.ISTRUZI_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${calendar_id}/events`);
    url.searchParams.append('showHiddenInvitations', showHiddenInvitations.toString());
    url.searchParams.append('singleEvents', singleEvents.toString());
    url.searchParams.append('alwaysIncludeEmail', alwaysIncludeEmail.toString());
    url.searchParams.append('orderBy', orderBy);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Referer': 'https://oauth.pstmn.io/v1/callback'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error retrieving events:', error);
    return {
      error: `An error occurred while retrieving events: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving events from Google Calendar.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_events',
      description: 'Retrieve events from a specified Google Calendar.',
      parameters: {
        type: 'object',
        properties: {
          calendar_id: {
            type: 'string',
            description: 'The ID of the calendar to retrieve events from.'
          },
          showHiddenInvitations: {
            type: 'boolean',
            description: 'Whether to show hidden invitations.'
          },
          singleEvents: {
            type: 'boolean',
            description: 'Whether to return single events instead of recurring events.'
          },
          alwaysIncludeEmail: {
            type: 'boolean',
            description: 'Whether to always include email addresses.'
          },
          orderBy: {
            type: 'string',
            description: 'The order in which to sort the events.'
          }
        },
        required: ['calendar_id']
      }
    }
  }
};

export { apiTool };