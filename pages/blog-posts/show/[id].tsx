import { Title, Text } from '@mantine/core'
import { GetOneResponse, useOne, useShow } from '@refinedev/core'
import { MarkdownField, Show } from '@refinedev/mantine'
import dataProvider from '@refinedev/nestjsx-crud'
import { GetServerSideProps } from 'next'
import { API_URL } from 'src/constants'
import { ICategory, IPost } from 'src/interfaces'

type BlogPostShowProps = {
  initialData: GetOneResponse<IPost>
}

export default function BlogPostShow({ initialData }: BlogPostShowProps) {
  const { queryResult } = useShow({
    queryOptions: {
      initialData,
    },
  })
  const { data, isLoading } = queryResult
  const record = data?.data

  // useOne is wrapper on useQuery and is used to fetch the category data
  const { data: categoryData, isLoading: categoryLoading } = useOne<ICategory>({
    resource: 'categories',
    id: record?.category.id || '',
    queryOptions: {
      enabled: !!record?.category.id,
    },
  })

  return (
    <Show isLoading={isLoading || categoryLoading}>
      <Title order={5}>Id as</Title>
      <Text mt="sm">{record?.id}</Text>

      <Title mt="sm" order={5}>
        Title
      </Title>
      <Text mt="sm">{record?.title}</Text>

      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />

      <Title mt="sm" order={5}>
        Category
      </Title>
      <Text>{categoryData?.data.title}</Text>
    </Show>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async context => {
  const data = await dataProvider(API_URL).getOne({
    resource: 'blog_posts',
    id: context.params?.id as string,
  })

  return {
    props: {
      initialData: data,
    },
  }
}
