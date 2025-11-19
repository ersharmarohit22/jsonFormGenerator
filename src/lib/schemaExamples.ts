import type { FormSchema } from '@/types'

export interface ExampleSchema {
  id: string
  name: string
  description: string
  category: 'contact' | 'registration' | 'feedback' | 'survey' | 'business' | 'styled' | 'other'
  schema: FormSchema
}

export const exampleSchemas: ExampleSchema[] = [
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Basic contact form with validation',
    category: 'contact',
    schema: {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true,
            minLength: 2,
            maxLength: 50
          }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '+1 (555) 123-4567',
          validation: {
            pattern: '^[+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,9}$'
          }
        },
        {
          id: '4',
          name: 'subject',
          label: 'Subject',
          type: 'select',
          options: [
            { label: 'General Inquiry', value: 'general' },
            { label: 'Technical Support', value: 'support' },
            { label: 'Sales', value: 'sales' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'message',
          label: 'Message',
          type: 'textarea',
          placeholder: 'Tell us more...',
          validation: {
            required: true,
            minLength: 10,
            maxLength: 500
          }
        },
        {
          id: '6',
          name: 'newsletter',
          label: 'Subscribe to newsletter',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  },
  {
    id: 'registration',
    name: 'User Registration',
    description: 'Complete user registration form',
    category: 'registration',
    schema: {
      title: 'Create Account',
      description: 'Sign up for a new account',
      fields: [
        {
          id: '1',
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe123',
          validation: {
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: '^[a-zA-Z0-9_]+$'
          },
          description: 'Only letters, numbers, and underscores'
        },
        {
          id: '2',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: '••••••••',
          validation: {
            required: true,
            minLength: 8,
            maxLength: 50
          },
          description: 'At least 8 characters'
        },
        {
          id: '4',
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: '••••••••',
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
            { label: 'Prefer not to say', value: 'no_answer' }
          ]
        },
        {
          id: '7',
          name: 'terms',
          label: 'I agree to the Terms and Conditions',
          type: 'checkbox',
          validation: {
            required: true
          }
        }
      ]
    }
  },
  {
    id: 'job-application',
    name: 'Job Application',
    description: 'Employment application form',
    category: 'business',
    schema: {
      title: 'Job Application',
      description: 'Apply for a position at our company',
      fields: [
        {
          id: '1',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          validation: {
            required: true,
            minLength: 2
          }
        },
        {
          id: '2',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
          validation: {
            required: true,
            minLength: 2
          }
        },
        {
          id: '3',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@email.com',
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'position',
          label: 'Position Applying For',
          type: 'select',
          options: [
            { label: 'Frontend Developer', value: 'frontend' },
            { label: 'Backend Developer', value: 'backend' },
            { label: 'Full Stack Developer', value: 'fullstack' },
            { label: 'UI/UX Designer', value: 'designer' },
            { label: 'Product Manager', value: 'pm' },
            { label: 'DevOps Engineer', value: 'devops' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'experience',
          label: 'Years of Experience',
          type: 'number',
          placeholder: '5',
          validation: {
            required: true,
            min: 0,
            max: 50
          }
        },
        {
          id: '7',
          name: 'portfolio',
          label: 'Portfolio/Website',
          type: 'url',
          placeholder: 'https://yourportfolio.com'
        },
        {
          id: '8',
          name: 'resume',
          label: 'Upload Resume',
          type: 'file',
          validation: {
            required: true
          }
        },
        {
          id: '9',
          name: 'coverLetter',
          label: 'Cover Letter',
          type: 'textarea',
          placeholder: 'Tell us why you would be a great fit...',
          validation: {
            required: true,
            minLength: 50,
            maxLength: 1000
          }
        },
        {
          id: '10',
          name: 'startDate',
          label: 'Available Start Date',
          type: 'date',
          validation: {
            required: true
          }
        }
      ]
    }
  },
  {
    id: 'feedback',
    name: 'Customer Feedback',
    description: 'Collect customer feedback and ratings',
    category: 'feedback',
    schema: {
      title: 'Customer Feedback',
      description: 'Help us improve our service',
      fields: [
        {
          id: '1',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'orderNumber',
          label: 'Order Number',
          type: 'text',
          placeholder: 'ORD-12345'
        },
        {
          id: '4',
          name: 'rating',
          label: 'Overall Experience',
          type: 'select',
          options: [
            { label: '⭐⭐⭐⭐⭐ Excellent', value: '5' },
            { label: '⭐⭐⭐⭐ Good', value: '4' },
            { label: '⭐⭐⭐ Average', value: '3' },
            { label: '⭐⭐ Poor', value: '2' },
            { label: '⭐ Very Poor', value: '1' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'category',
          label: 'Feedback Category',
          type: 'radio',
          options: [
            { label: 'Product Quality', value: 'quality' },
            { label: 'Customer Service', value: 'service' },
            { label: 'Delivery', value: 'delivery' },
            { label: 'Website/App', value: 'website' },
            { label: 'Other', value: 'other' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'comments',
          label: 'Additional Comments',
          type: 'textarea',
          placeholder: 'Share your thoughts...',
          validation: {
            required: true,
            minLength: 10
          }
        },
        {
          id: '7',
          name: 'recommend',
          label: 'Would you recommend us to others?',
          type: 'radio',
          options: [
            { label: 'Yes, definitely', value: 'yes' },
            { label: 'Maybe', value: 'maybe' },
            { label: 'No', value: 'no' }
          ],
          validation: {
            required: true
          }
        }
      ]
    }
  },
  {
    id: 'survey',
    name: 'Customer Survey',
    description: 'Market research survey form',
    category: 'survey',
    schema: {
      title: 'Product Survey',
      description: 'Help us understand your needs',
      fields: [
        {
          id: '1',
          name: 'age',
          label: 'Age Range',
          type: 'select',
          options: [
            { label: 'Under 18', value: 'under18' },
            { label: '18-24', value: '18-24' },
            { label: '25-34', value: '25-34' },
            { label: '35-44', value: '35-44' },
            { label: '45-54', value: '45-54' },
            { label: '55-64', value: '55-64' },
            { label: '65+', value: '65plus' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'occupation',
          label: 'Occupation',
          type: 'text',
          placeholder: 'Software Engineer',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'usage',
          label: 'How often do you use our product?',
          type: 'radio',
          options: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Rarely', value: 'rarely' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'satisfaction',
          label: 'Satisfaction Level',
          type: 'select',
          options: [
            { label: 'Very Satisfied', value: '5' },
            { label: 'Satisfied', value: '4' },
            { label: 'Neutral', value: '3' },
            { label: 'Dissatisfied', value: '2' },
            { label: 'Very Dissatisfied', value: '1' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'features',
          label: 'Most Important Features',
          type: 'textarea',
          placeholder: 'List the features you value most...',
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'improvements',
          label: 'Suggested Improvements',
          type: 'textarea',
          placeholder: 'What could we improve?'
        },
        {
          id: '7',
          name: 'contactForFollowup',
          label: 'May we contact you for follow-up questions?',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  },
  {
    id: 'event',
    name: 'Event Registration',
    description: 'Register for events and conferences',
    category: 'registration',
    schema: {
      title: 'Event Registration',
      description: 'Register for our upcoming conference',
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'company',
          label: 'Company/Organization',
          type: 'text',
          placeholder: 'Acme Corp'
        },
        {
          id: '4',
          name: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          placeholder: 'Senior Developer'
        },
        {
          id: '5',
          name: 'ticketType',
          label: 'Ticket Type',
          type: 'radio',
          options: [
            { label: 'Early Bird - $99', value: 'earlybird' },
            { label: 'Regular - $149', value: 'regular' },
            { label: 'VIP - $299', value: 'vip' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'attendees',
          label: 'Number of Attendees',
          type: 'number',
          placeholder: '1',
          validation: {
            required: true,
            min: 1,
            max: 10
          }
        },
        {
          id: '7',
          name: 'dietaryRestrictions',
          label: 'Dietary Restrictions',
          type: 'textarea',
          placeholder: 'Please list any dietary restrictions...'
        },
        {
          id: '8',
          name: 'specialRequirements',
          label: 'Special Requirements',
          type: 'textarea',
          placeholder: 'Accessibility needs, etc.'
        },
        {
          id: '9',
          name: 'marketingConsent',
          label: 'Send me updates about future events',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Simple newsletter subscription form',
    category: 'contact',
    schema: {
      title: 'Subscribe to Our Newsletter',
      description: 'Get the latest updates delivered to your inbox',
      fields: [
        {
          id: '1',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'you@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'interests',
          label: 'Topics of Interest',
          type: 'select',
          options: [
            { label: 'Technology', value: 'tech' },
            { label: 'Business', value: 'business' },
            { label: 'Design', value: 'design' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'All Topics', value: 'all' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'frequency',
          label: 'Email Frequency',
          type: 'radio',
          options: [
            { label: 'Daily Digest', value: 'daily' },
            { label: 'Weekly Newsletter', value: 'weekly' },
            { label: 'Monthly Updates', value: 'monthly' }
          ],
          validation: {
            required: true
          }
        }
      ]
    }
  },
  {
    id: 'review',
    name: 'Product Review',
    description: 'Submit a product review with rating',
    category: 'feedback',
    schema: {
      title: 'Product Review',
      description: 'Share your experience with this product',
      fields: [
        {
          id: '1',
          name: 'reviewerName',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'reviewerEmail',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'productRating',
          label: 'Overall Rating',
          type: 'select',
          options: [
            { label: '5 Stars - Excellent', value: '5' },
            { label: '4 Stars - Very Good', value: '4' },
            { label: '3 Stars - Good', value: '3' },
            { label: '2 Stars - Fair', value: '2' },
            { label: '1 Star - Poor', value: '1' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'reviewTitle',
          label: 'Review Title',
          type: 'text',
          placeholder: 'Great product!',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 100
          }
        },
        {
          id: '5',
          name: 'reviewText',
          label: 'Your Review',
          type: 'textarea',
          placeholder: 'Tell us about your experience...',
          validation: {
            required: true,
            minLength: 20,
            maxLength: 1000
          }
        },
        {
          id: '6',
          name: 'wouldRecommend',
          label: 'Would you recommend this product?',
          type: 'radio',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '7',
          name: 'verifiedPurchase',
          label: 'This is a verified purchase',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  },
  {
    id: 'appointment',
    name: 'Appointment Booking',
    description: 'Schedule an appointment or meeting',
    category: 'business',
    schema: {
      title: 'Book an Appointment',
      description: 'Schedule a consultation with our team',
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'serviceType',
          label: 'Service Type',
          type: 'select',
          options: [
            { label: 'Initial Consultation', value: 'consultation' },
            { label: 'Follow-up', value: 'followup' },
            { label: 'Technical Support', value: 'support' },
            { label: 'Demo/Presentation', value: 'demo' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'preferredDate',
          label: 'Preferred Date',
          type: 'date',
          validation: {
            required: true
          }
        },
        {
          id: '6',
          name: 'preferredTime',
          label: 'Preferred Time',
          type: 'time',
          validation: {
            required: true
          }
        },
        {
          id: '7',
          name: 'notes',
          label: 'Additional Notes',
          type: 'textarea',
          placeholder: 'Any specific requirements or topics to discuss...'
        }
      ]
    }
  },
  {
    id: 'support',
    name: 'Support Ticket',
    description: 'Submit a technical support request',
    category: 'business',
    schema: {
      title: 'Technical Support Request',
      description: 'Get help from our support team',
      fields: [
        {
          id: '1',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: {
            required: true
          }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: {
            required: true
          }
        },
        {
          id: '3',
          name: 'priority',
          label: 'Priority Level',
          type: 'select',
          options: [
            { label: '🔴 Critical - System Down', value: 'critical' },
            { label: '🟠 High - Major Issue', value: 'high' },
            { label: '🟡 Medium - Minor Issue', value: 'medium' },
            { label: '🟢 Low - Question/Request', value: 'low' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '4',
          name: 'category',
          label: 'Issue Category',
          type: 'select',
          options: [
            { label: 'Login/Authentication', value: 'auth' },
            { label: 'Performance', value: 'performance' },
            { label: 'Bug/Error', value: 'bug' },
            { label: 'Feature Request', value: 'feature' },
            { label: 'Other', value: 'other' }
          ],
          validation: {
            required: true
          }
        },
        {
          id: '5',
          name: 'subject',
          label: 'Subject',
          type: 'text',
          placeholder: 'Brief description of the issue',
          validation: {
            required: true,
            minLength: 5
          }
        },
        {
          id: '6',
          name: 'description',
          label: 'Detailed Description',
          type: 'textarea',
          placeholder: 'Please provide detailed information about the issue...',
          validation: {
            required: true,
            minLength: 20
          }
        },
        {
          id: '7',
          name: 'screenshot',
          label: 'Attach Screenshot (optional)',
          type: 'file'
        }
      ]
    }
  },
  {
    id: 'styled-modern',
    name: '🎨 Modern Indigo Theme',
    description: 'Beautiful form with custom indigo colors and relaxed spacing',
    category: 'styled',
    schema: {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      style: {
        layout: 'vertical',
        spacing: 'relaxed',
        buttonAlignment: 'full',
        theme: {
          buttonColor: '#6366f1',
          buttonTextColor: '#ffffff',
          focusColor: '#6366f1',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true, minLength: 2 }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '+1 (555) 123-4567'
        },
        {
          id: '4',
          name: 'message',
          label: 'Message',
          type: 'textarea',
          placeholder: 'Tell us how we can help...',
          validation: { required: true, minLength: 10 }
        }
      ]
    }
  },
  {
    id: 'styled-grid',
    name: '🎨 Compact Grid Layout',
    description: 'Two-column grid with compact spacing and small fields',
    category: 'styled',
    schema: {
      title: 'Quick Registration',
      description: 'Sign up in seconds',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'compact',
        buttonAlignment: 'right',
        theme: {
          buttonColor: '#10b981',
          buttonTextColor: '#ffffff',
        },
        fieldStyle: {
          borderRadius: 'md',
          fieldHeight: 'sm',
        },
      },
      fields: [
        {
          id: '1',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          placeholder: '(555) 123-4567'
        }
      ]
    }
  },
  {
    id: 'styled-minimal',
    name: '🎨 Minimal Black & White',
    description: 'Clean minimal design with rounded pill-shaped fields',
    category: 'styled',
    schema: {
      title: 'Newsletter Signup',
      description: 'Stay updated with our latest news',
      style: {
        layout: 'vertical',
        spacing: 'normal',
        buttonAlignment: 'center',
        theme: {
          buttonColor: '#000000',
          buttonTextColor: '#ffffff',
        },
        fieldStyle: {
          borderRadius: 'full',
          borderWidth: 'thin',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'you@example.com',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        }
      ]
    }
  },
  {
    id: 'styled-colorful',
    name: '🎨 Colorful Purple Theme',
    description: 'Vibrant purple theme with large fields',
    category: 'styled',
    schema: {
      title: 'Feedback Form',
      description: 'We value your feedback',
      style: {
        layout: 'vertical',
        spacing: 'relaxed',
        buttonAlignment: 'full',
        theme: {
          buttonColor: '#9333ea',
          buttonTextColor: '#ffffff',
          focusColor: '#9333ea',
        },
        fieldStyle: {
          borderRadius: 'xl',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'rating',
          label: 'How was your experience?',
          type: 'select',
          options: [
            { label: '⭐⭐⭐⭐⭐ Excellent', value: '5' },
            { label: '⭐⭐⭐⭐ Good', value: '4' },
            { label: '⭐⭐⭐ Average', value: '3' },
            { label: '⭐⭐ Poor', value: '2' },
            { label: '⭐ Very Poor', value: '1' }
          ],
          validation: { required: true }
        },
        {
          id: '3',
          name: 'feedback',
          label: 'Your Feedback',
          type: 'textarea',
          placeholder: 'Tell us what you think...',
          validation: { required: true, minLength: 10 }
        }
      ]
    }
  },
  {
    id: 'styled-tech',
    name: '🎨 Tech Blue Theme',
    description: 'Professional tech-style form with cyan accents',
    category: 'styled',
    schema: {
      title: 'Beta Access Request',
      description: 'Request early access to our platform',
      style: {
        layout: 'vertical',
        spacing: 'normal',
        buttonAlignment: 'full',
        theme: {
          buttonColor: '#0891b2',
          buttonTextColor: '#ffffff',
          focusColor: '#0891b2',
        },
        fieldStyle: {
          borderRadius: 'md',
          borderWidth: 'normal',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Acme Corporation',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'email',
          label: 'Work Email',
          type: 'email',
          placeholder: 'you@company.com',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'companySize',
          label: 'Company Size',
          type: 'select',
          options: [
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '500+ employees', value: '500+' }
          ],
          validation: { required: true }
        },
        {
          id: '4',
          name: 'useCase',
          label: 'Primary Use Case',
          type: 'textarea',
          placeholder: 'Describe how you plan to use our platform...',
          validation: { required: true, minLength: 20 }
        }
      ]
    }
  },
  {
    id: 'styled-survey-radio',
    name: '🎨 Survey with Radio Buttons',
    description: 'Orange theme with radio buttons and checkboxes',
    category: 'styled',
    schema: {
      title: 'Customer Satisfaction Survey',
      description: 'Help us improve our service',
      style: {
        layout: 'vertical',
        spacing: 'relaxed',
        buttonAlignment: 'full',
        theme: {
          buttonColor: '#f97316',
          buttonTextColor: '#ffffff',
          focusColor: '#f97316',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'satisfaction',
          label: 'How satisfied are you with our service?',
          type: 'radio',
          options: [
            { label: 'Very Satisfied', value: 'very-satisfied' },
            { label: 'Satisfied', value: 'satisfied' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Dissatisfied', value: 'dissatisfied' },
            { label: 'Very Dissatisfied', value: 'very-dissatisfied' }
          ],
          validation: { required: true }
        },
        {
          id: '3',
          name: 'features',
          label: 'Which features do you use? (Check all that apply)',
          type: 'checkbox',
          description: 'Select the features you regularly use'
        },
        {
          id: '4',
          name: 'recommend',
          label: 'Would you recommend us to others?',
          type: 'radio',
          options: [
            { label: 'Definitely Yes', value: 'definitely' },
            { label: 'Probably Yes', value: 'probably' },
            { label: 'Not Sure', value: 'unsure' },
            { label: 'Probably Not', value: 'probably-not' },
            { label: 'Definitely Not', value: 'definitely-not' }
          ],
          validation: { required: true }
        },
        {
          id: '5',
          name: 'comments',
          label: 'Additional Comments',
          type: 'textarea',
          placeholder: 'Share your thoughts...'
        }
      ]
    }
  },
  {
    id: 'styled-booking-date',
    name: '🎨 Booking Form with Dates',
    description: 'Teal theme with date fields and radio options',
    category: 'styled',
    schema: {
      title: 'Appointment Booking',
      description: 'Schedule your consultation',
      style: {
        layout: 'vertical',
        spacing: 'normal',
        buttonAlignment: 'center',
        theme: {
          buttonColor: '#14b8a6',
          buttonTextColor: '#ffffff',
          focusColor: '#14b8a6',
        },
        fieldStyle: {
          borderRadius: 'xl',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'appointmentDate',
          label: 'Preferred Date',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '5',
          name: 'appointmentTime',
          label: 'Preferred Time',
          type: 'time',
          validation: { required: true }
        },
        {
          id: '6',
          name: 'serviceType',
          label: 'Type of Service',
          type: 'radio',
          options: [
            { label: 'Consultation (30 min)', value: 'consultation' },
            { label: 'Full Session (60 min)', value: 'full-session' },
            { label: 'Extended Session (90 min)', value: 'extended' }
          ],
          validation: { required: true }
        },
        {
          id: '7',
          name: 'confirmReminders',
          label: 'Send me appointment reminders',
          type: 'checkbox',
          defaultValue: true
        },
        {
          id: '8',
          name: 'notes',
          label: 'Special Requirements',
          type: 'textarea',
          placeholder: 'Any special needs or requests...'
        }
      ]
    }
  },
  {
    id: 'styled-dark-theme',
    name: '🎨 Dark Background Theme',
    description: 'Dark slate background with amber accents',
    category: 'styled',
    schema: {
      title: 'Premium Membership',
      description: 'Join our exclusive community',
      style: {
        layout: 'vertical',
        spacing: 'relaxed',
        buttonAlignment: 'full',
        theme: {
          backgroundColor: '#1e293b',
          textColor: '#f1f5f9',
          buttonColor: '#f59e0b',
          buttonTextColor: '#000000',
          focusColor: '#fbbf24',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john@example.com',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'membershipType',
          label: 'Membership Plan',
          type: 'radio',
          options: [
            { label: 'Basic - $9.99/month', value: 'basic' },
            { label: 'Pro - $19.99/month', value: 'pro' },
            { label: 'Premium - $29.99/month', value: 'premium' }
          ],
          validation: { required: true }
        },
        {
          id: '4',
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '5',
          name: 'agreedToTerms',
          label: 'I agree to the Terms and Conditions',
          type: 'checkbox',
          validation: { required: true }
        },
        {
          id: '6',
          name: 'newsletter',
          label: 'Subscribe to newsletter and updates',
          type: 'checkbox',
          defaultValue: true
        }
      ]
    }
  },
  {
    id: 'styled-pastel-theme',
    name: '🎨 Soft Pastel Theme',
    description: 'Light pink background with soft colors',
    category: 'styled',
    schema: {
      title: 'Event Registration',
      description: 'Register for our upcoming event',
      style: {
        layout: 'vertical',
        spacing: 'normal',
        buttonAlignment: 'center',
        theme: {
          backgroundColor: '#fdf2f8',
          textColor: '#831843',
          buttonColor: '#db2777',
          buttonTextColor: '#ffffff',
          focusColor: '#ec4899',
        },
        fieldStyle: {
          borderRadius: 'full',
          borderWidth: 'thin',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'attendeeName',
          label: 'Attendee Name',
          type: 'text',
          placeholder: 'Jane Smith',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'jane@example.com',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'attendanceType',
          label: 'How will you attend?',
          type: 'radio',
          options: [
            { label: 'In-Person', value: 'in-person' },
            { label: 'Virtual', value: 'virtual' },
            { label: 'Hybrid', value: 'hybrid' }
          ],
          validation: { required: true }
        },
        {
          id: '4',
          name: 'eventDate',
          label: 'Select Event Date',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '5',
          name: 'interests',
          label: 'Topics of Interest',
          type: 'checkbox',
          description: 'We will tailor your experience based on your interests'
        },
        {
          id: '6',
          name: 'dietaryPreferences',
          label: 'Dietary Preferences',
          type: 'radio',
          options: [
            { label: 'No Restrictions', value: 'none' },
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Vegan', value: 'vegan' },
            { label: 'Gluten-Free', value: 'gluten-free' },
            { label: 'Other', value: 'other' }
          ]
        },
        {
          id: '7',
          name: 'marketingConsent',
          label: 'Send me information about future events',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  },
  {
    id: 'styled-green-earth',
    name: '🎨 Earth Green Theme',
    description: 'Eco-friendly green theme with checkboxes',
    category: 'styled',
    schema: {
      title: 'Sustainability Survey',
      description: 'Help us understand your eco-friendly preferences',
      style: {
        layout: 'vertical',
        spacing: 'relaxed',
        buttonAlignment: 'full',
        theme: {
          backgroundColor: '#f0fdf4',
          textColor: '#14532d',
          buttonColor: '#16a34a',
          buttonTextColor: '#ffffff',
          focusColor: '#22c55e',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'name',
          label: 'Your Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'age',
          label: 'Age Group',
          type: 'radio',
          options: [
            { label: 'Under 18', value: 'under-18' },
            { label: '18-25', value: '18-25' },
            { label: '26-35', value: '26-35' },
            { label: '36-50', value: '36-50' },
            { label: '50+', value: '50-plus' }
          ],
          validation: { required: true }
        },
        {
          id: '3',
          name: 'recycleRegularly',
          label: 'I recycle regularly',
          type: 'checkbox'
        },
        {
          id: '4',
          name: 'usePublicTransport',
          label: 'I use public transportation when possible',
          type: 'checkbox'
        },
        {
          id: '5',
          name: 'reduceWaste',
          label: 'I actively try to reduce waste',
          type: 'checkbox'
        },
        {
          id: '6',
          name: 'startDate',
          label: 'When did you start your eco-friendly journey?',
          type: 'date'
        },
        {
          id: '7',
          name: 'commitment',
          label: 'How committed are you to sustainability?',
          type: 'radio',
          options: [
            { label: 'Very Committed', value: 'very' },
            { label: 'Moderately Committed', value: 'moderate' },
            { label: 'Just Starting', value: 'starting' },
            { label: 'Interested', value: 'interested' }
          ],
          validation: { required: true }
        },
        {
          id: '8',
          name: 'suggestions',
          label: 'Your Sustainability Suggestions',
          type: 'textarea',
          placeholder: 'Share your ideas...'
        }
      ]
    }
  },
  {
    id: 'grid-two-column-contact',
    name: '📐 Two-Column Contact Form',
    description: 'Grid layout with 2 inputs per row',
    category: 'styled',
    schema: {
      title: 'Contact Information',
      description: 'Please fill out your details',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'normal',
        buttonAlignment: 'right',
        theme: {
          buttonColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          focusColor: '#3b82f6',
        },
        fieldStyle: {
          borderRadius: 'md',
          borderWidth: 'normal',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: { required: true }
        },
        {
          id: '5',
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'New York'
        },
        {
          id: '6',
          name: 'state',
          label: 'State',
          type: 'text',
          placeholder: 'NY'
        },
        {
          id: '7',
          name: 'zipCode',
          label: 'ZIP Code',
          type: 'text',
          placeholder: '10001'
        },
        {
          id: '8',
          name: 'country',
          label: 'Country',
          type: 'text',
          placeholder: 'United States'
        }
      ]
    }
  },
  {
    id: 'grid-payment-form',
    name: '📐 Payment Form (2 Columns)',
    description: 'Credit card form with grid layout',
    category: 'styled',
    schema: {
      title: 'Payment Details',
      description: 'Enter your payment information securely',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'compact',
        buttonAlignment: 'full',
        theme: {
          backgroundColor: '#f8fafc',
          buttonColor: '#10b981',
          buttonTextColor: '#ffffff',
          focusColor: '#10b981',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'cardholderName',
          label: 'Cardholder Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'cardNumber',
          label: 'Card Number',
          type: 'text',
          placeholder: '1234 5678 9012 3456',
          validation: { required: true, pattern: '^[0-9]{13,19}$' }
        },
        {
          id: '3',
          name: 'expiryDate',
          label: 'Expiry Date',
          type: 'text',
          placeholder: 'MM/YY',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'cvv',
          label: 'CVV',
          type: 'text',
          placeholder: '123',
          validation: { required: true, minLength: 3, maxLength: 4 }
        },
        {
          id: '5',
          name: 'billingAddress',
          label: 'Billing Address',
          type: 'text',
          placeholder: '123 Main St',
          validation: { required: true }
        },
        {
          id: '6',
          name: 'apartment',
          label: 'Apartment/Suite',
          type: 'text',
          placeholder: 'Apt 4B'
        },
        {
          id: '7',
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'New York',
          validation: { required: true }
        },
        {
          id: '8',
          name: 'postalCode',
          label: 'Postal Code',
          type: 'text',
          placeholder: '10001',
          validation: { required: true }
        }
      ]
    }
  },
  {
    id: 'grid-employee-form',
    name: '📐 Employee Information Grid',
    description: 'HR form with 2-column layout and compact spacing',
    category: 'styled',
    schema: {
      title: 'Employee Registration',
      description: 'New hire information form',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'compact',
        buttonAlignment: 'center',
        theme: {
          buttonColor: '#8b5cf6',
          buttonTextColor: '#ffffff',
          focusColor: '#8b5cf6',
        },
        fieldStyle: {
          borderRadius: 'md',
          borderWidth: 'normal',
          fieldHeight: 'md',
        },
      },
      fields: [
        {
          id: '1',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Jane',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Smith',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'email',
          label: 'Work Email',
          type: 'email',
          placeholder: 'jane.smith@company.com',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'employeeId',
          label: 'Employee ID',
          type: 'text',
          placeholder: 'EMP-12345',
          validation: { required: true }
        },
        {
          id: '5',
          name: 'department',
          label: 'Department',
          type: 'select',
          options: [
            { label: 'Engineering', value: 'engineering' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Sales', value: 'sales' },
            { label: 'HR', value: 'hr' },
            { label: 'Finance', value: 'finance' }
          ],
          validation: { required: true }
        },
        {
          id: '6',
          name: 'position',
          label: 'Position',
          type: 'text',
          placeholder: 'Software Engineer',
          validation: { required: true }
        },
        {
          id: '7',
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '8',
          name: 'birthDate',
          label: 'Date of Birth',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '9',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: { required: true }
        },
        {
          id: '10',
          name: 'emergencyContact',
          label: 'Emergency Contact',
          type: 'tel',
          placeholder: '(555) 987-6543',
          validation: { required: true }
        }
      ]
    }
  },
  {
    id: 'grid-shipping-form',
    name: '📐 Shipping Address Grid',
    description: 'E-commerce shipping form with 2-column layout',
    category: 'styled',
    schema: {
      title: 'Shipping Information',
      description: 'Where should we deliver your order?',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'normal',
        buttonAlignment: 'full',
        theme: {
          backgroundColor: '#fffbeb',
          textColor: '#78350f',
          buttonColor: '#f59e0b',
          buttonTextColor: '#ffffff',
          focusColor: '#fbbf24',
        },
        fieldStyle: {
          borderRadius: 'lg',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '2',
          name: 'company',
          label: 'Company (Optional)',
          type: 'text',
          placeholder: 'Acme Corp'
        },
        {
          id: '3',
          name: 'streetAddress',
          label: 'Street Address',
          type: 'text',
          placeholder: '123 Main Street',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'apartment',
          label: 'Apt/Suite',
          type: 'text',
          placeholder: 'Suite 100'
        },
        {
          id: '5',
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'San Francisco',
          validation: { required: true }
        },
        {
          id: '6',
          name: 'state',
          label: 'State/Province',
          type: 'text',
          placeholder: 'CA',
          validation: { required: true }
        },
        {
          id: '7',
          name: 'zipCode',
          label: 'ZIP/Postal Code',
          type: 'text',
          placeholder: '94102',
          validation: { required: true }
        },
        {
          id: '8',
          name: 'country',
          label: 'Country',
          type: 'select',
          options: [
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Australia', value: 'au' }
          ],
          validation: { required: true }
        },
        {
          id: '9',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          validation: { required: true }
        },
        {
          id: '10',
          name: 'deliveryInstructions',
          label: 'Delivery Instructions',
          type: 'textarea',
          placeholder: 'Leave at front door'
        }
      ]
    }
  },
  {
    id: 'grid-dark-profile',
    name: '📐 Dark Profile Grid',
    description: 'Profile form with dark theme and 2-column layout',
    category: 'styled',
    schema: {
      title: 'Complete Your Profile',
      description: 'Tell us more about yourself',
      style: {
        layout: 'grid',
        columns: 2,
        spacing: 'relaxed',
        buttonAlignment: 'center',
        theme: {
          backgroundColor: '#0f172a',
          textColor: '#e2e8f0',
          buttonColor: '#06b6d4',
          buttonTextColor: '#ffffff',
          focusColor: '#22d3ee',
        },
        fieldStyle: {
          borderRadius: 'xl',
          borderWidth: 'normal',
          fieldHeight: 'lg',
        },
      },
      fields: [
        {
          id: '1',
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe',
          validation: { required: true, minLength: 3 }
        },
        {
          id: '2',
          name: 'displayName',
          label: 'Display Name',
          type: 'text',
          placeholder: 'John Doe',
          validation: { required: true }
        },
        {
          id: '3',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          validation: { required: true }
        },
        {
          id: '4',
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          placeholder: '+1 (555) 123-4567'
        },
        {
          id: '5',
          name: 'birthDate',
          label: 'Date of Birth',
          type: 'date',
          validation: { required: true }
        },
        {
          id: '6',
          name: 'gender',
          label: 'Gender',
          type: 'select',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
            { label: 'Prefer not to say', value: 'no-answer' }
          ]
        },
        {
          id: '7',
          name: 'website',
          label: 'Website',
          type: 'url',
          placeholder: 'https://example.com'
        },
        {
          id: '8',
          name: 'linkedin',
          label: 'LinkedIn',
          type: 'url',
          placeholder: 'https://linkedin.com/in/...'
        },
        {
          id: '9',
          name: 'bio',
          label: 'Bio',
          type: 'textarea',
          placeholder: 'Tell us about yourself...',
          validation: { maxLength: 500 }
        },
        {
          id: '10',
          name: 'interests',
          label: 'Interests',
          type: 'textarea',
          placeholder: 'Your hobbies and interests...'
        }
      ]
    }
  }
]

export function getExampleById(id: string): ExampleSchema | undefined {
  return exampleSchemas.find(example => example.id === id)
}

export function getExamplesByCategory(category: ExampleSchema['category']): ExampleSchema[] {
  return exampleSchemas.filter(example => example.category === category)
}

export const categories: { value: ExampleSchema['category']; label: string }[] = [
  { value: 'styled', label: '🎨 Styled Forms' },
  { value: 'contact', label: 'Contact Forms' },
  { value: 'registration', label: 'Registration' },
  { value: 'feedback', label: 'Feedback & Reviews' },
  { value: 'survey', label: 'Surveys' },
  { value: 'business', label: 'Business' },
  { value: 'other', label: 'Other' }
]

