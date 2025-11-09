/**
 * Application Constants - Aarunya Villas
 * This file exports various constants for Greenrich Highlands villa project
 */

// Villa Types for the villa showcase slider
const flavorlists = [
  {
    name: "The Heritage Villa",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
    sqft: "7,150 sq.ft",
  },
  {
    name: "The Premium Villa",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
    sqft: "6,500 sq.ft",
  },
  {
    name: "The Executive Villa",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
    sqft: "6,200 sq.ft",
  },
  {
    name: "The Elite Villa",
    color: "orange",
    rotation: "md:rotate-[8deg] rotate-0",
    sqft: "5,950 sq.ft",
  },
  {
    name: "The Classic Villa",
    color: "white",
    rotation: "md:rotate-[-8deg] rotate-0",
    sqft: "5,800 sq.ft",
  },
  {
    name: "The Signature Villa",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
    sqft: "5,650 sq.ft",
  },
];

// Key Amenities & Features
const nutrientLists = [
  { label: "Total Villas", amount: "322" },
  { label: "Clubhouse", amount: "50,000 sq.ft" },
  { label: "Total Acres", amount: "45" },
  { label: "Plot Sizes", amount: "383-720 sq.yds" },
  { label: "Township", amount: "500 Acres" },
];

// Resident Testimonial cards
const cards = [
  {
    src: "/videos/f1.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Madison",
    img: "/images/4.jpg",
    translation: "translate-y-[-5%]",
    designation: "Villa Owner",
  },
  {
    src: "/videos/f2.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Alexander",
    img: "/images/5.jpg",
  },
  {
    src: "/videos/f3.mp4",
    rotation: "rotate-z-[-4deg]",
    name: "Andrew",
    img: "/images/6.jpg",
    translation: "translate-y-[-5%]",
    designation: "Property Investor",
  },
  {
    src: "/videos/f4.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Bryan",
    img: "/images/7.jpg",
    translation: "translate-y-[5%]",
    designation: "Homeowner",
  },
  {
    src: "/videos/f5.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Chris",
    img: "/images/8.jpg",
  },
  {
    src: "/videos/f6.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Devante",
    img: "/images/9.jpg",
    translation: "translate-y-[5%]",
    designation: "Happy Resident",
  },
  {
    src: "/videos/f7.mp4",
    rotation: "rotate-z-[-3deg]",
    name: "Melisa",
    img: "/images/10.jpg",
    translation: "translate-y-[10%]",
    designation: "Villa Owner",
  },
];

// Re-export theme for convenience
export { default as theme } from "./theme";

export { flavorlists, nutrientLists, cards };
