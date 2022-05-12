import Image from 'next/image'

export function JumbotronContainer() {
  return (
    <>
      <Image
        src="/images/hero-image.png"
        width="1440"
        height="484"
        layout="responsive"
        alt="Image of hero"
      />
    </>
  )
}
