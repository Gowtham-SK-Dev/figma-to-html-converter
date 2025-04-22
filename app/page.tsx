"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Code, FileCode, Layers } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Transform Your <span className="gradient-text">Figma Designs</span> Into{" "}
                <span className="gradient-text">Code</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Convert Figma designs into clean, responsive HTML and Tailwind CSS code with just a few clicks.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/demo">
                  Try Demo Mode
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/advanced">
                  Advanced Mode
                  <Layers className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="rounded-full p-3 gradient-bg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Accurate Code Generation</h3>
                <p className="text-muted-foreground">
                  Get pixel-perfect HTML and Tailwind CSS code that matches your Figma design.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="rounded-full p-3 gradient-bg">
                <FileCode className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Asset Extraction</h3>
                <p className="text-muted-foreground">
                  Automatically extract and optimize all images and icons from your design.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="rounded-full p-3 gradient-bg">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Multiple Export Options</h3>
                <p className="text-muted-foreground">Export as HTML + Tailwind CSS, React JSX, or plain CSS.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Convert Your Designs?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Start with our demo mode or use the advanced mode for more control.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/demo">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
