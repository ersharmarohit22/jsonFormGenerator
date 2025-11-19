import type { FormSchema } from '@/types'

export const styledExamples: FormSchema[] = [
  {
    title: 'Modern Styled Form',
    description: 'A beautifully styled form with custom colors',
    style: {
      layout: 'vertical',
      spacing: 'relaxed',
      buttonAlignment: 'full',
      theme: {
        primaryColor: '#6366f1',
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
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'John Doe',
        validation: { required: true },
      },
      {
        id: '2',
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'john@example.com',
        validation: { required: true },
      },
      {
        id: '3',
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Your message...',
        validation: { required: true },
      },
    ],
  },
  {
    title: 'Compact Grid Layout',
    description: 'Two-column grid layout with compact spacing',
    style: {
      layout: 'grid',
      columns: 2,
      spacing: 'compact',
      buttonAlignment: 'right',
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
        validation: { required: true },
      },
      {
        id: '2',
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        validation: { required: true },
      },
      {
        id: '3',
        name: 'email',
        label: 'Email',
        type: 'email',
        validation: { required: true },
      },
      {
        id: '4',
        name: 'phone',
        label: 'Phone',
        type: 'tel',
      },
    ],
  },
  {
    title: 'Minimal Style',
    description: 'Clean, minimal design with rounded buttons',
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
        validation: { required: true },
      },
      {
        id: '2',
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        validation: { required: true, minLength: 8 },
      },
    ],
  },
]

