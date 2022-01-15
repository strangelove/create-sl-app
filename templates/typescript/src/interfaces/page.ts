interface PageProps<OptionType> {
  data : OptionType;
  error: Error;
  paths?: string
}

export default PageProps