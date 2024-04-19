import prisma from '@/prisma/client'
import {notFound} from 'next/navigation'


interface Props {
  params: {id: string}
}
const IssueDetailsPage = async ({params}: Props) => {
  const issue = await prisma.issue.findUnique({
    where:
      {id: parseInt(params.id)}
  })

  if (!issue) {
    notFound()
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailsPage