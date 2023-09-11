import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { FormOperations } from './form-operations'

const FormItem = ({id,title,createdAt} : any) => {
  return (
    <div className="flex items-center justify-between p-4 border-[1px] border-slate-700 rounded-md">
      <div className="grid gap-1">
        <Link
          href={`/editor`}
          className="font-semibold hover:underline"
        >
          {title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <FormOperations post={{ id: id, title: title}} />
    </div>
  )
}

export default FormItem