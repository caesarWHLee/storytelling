import Image from 'next/image'

export default function HeroImage() {
  return (
    <div>
      <Image
        src="/images/hero-image.png"
        width="1440"
        height="484"
        layout="responsive"
        alt="Image of hero"
      />
    </div>
  )
}
