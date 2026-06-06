import React from 'react'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import Footer from '../components/Footer'
import Dashboard from '../components/Dashboard'
import QuickActions from '../components/QuickActions'
import DiseaseDetails from '../components/DiseaseDetails'
import WeatherCard from '../components/WeatherCard'
import ProductList from '../components/ProductList'
import StoreList from '../components/StoreList'
import ExpertChat from '../components/ExpertChat'
import AssistantWidget from '../components/AssistantWidget'

export default function DashboardPage(){
  return (
    <div>
      <Header />
      <HeroBanner />
      <main className="app-main">
        <div className="container">
          <Dashboard />
          <QuickActions />
          <section className="content-columns">
            <div className="left-col">
              <DiseaseDetails />
            </div>
            <div className="right-col">
              <WeatherCard />
              <ProductList />
              <StoreList />
              <ExpertChat />
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <AssistantWidget />
    </div>
  )
}
