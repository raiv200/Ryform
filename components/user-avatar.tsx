import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

export function UserAvatar({props} : any) {
  return (
    <Avatar {...props}>
     {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback className="">
        <span className="sr-only">LK</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}
