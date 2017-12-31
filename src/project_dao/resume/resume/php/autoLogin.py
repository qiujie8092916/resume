# -*- coding:utf-8 -*-

from selenium import webdriver

driver = webdriver.Chrome('chromedriver')
driver.implicitly_wait(30)
base_url = "https://icepointcloud.com/login.jsp?redirect=https://icepointcloud.com/dashboard.jsp"  #30****测试环境**
driver.get(base_url)
driver.find_element_by_xpath('//*[@id="account"]').send_keys('demo@icepointcloud.com')
driver.find_element_by_xpath('//*[@id="password"]').send_keys('doray123')
driver.find_element_by_xpath('//*[@id="login-button"]').click()